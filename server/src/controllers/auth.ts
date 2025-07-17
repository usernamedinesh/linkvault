import { loginSchema, signupSchema, forgotPasswordSchema, newPasswordSchemaServer, type Login, type Signup, type ForgotPassword } from "shared";
import type { ApiResponse, ApiError } from "shared";
import { apiSuccess, apiError, jsonResponse } from "../utils/apiResponse";
import { AppError } from "../utils/CustomError";
import { findUserByEmail, createUser, get_user_profile } from "../db/queries/user";
import { saveToken, validateExpiryAndToken, deleteToken, saveNewPassword } from "../db/queries/passwordreset";
import { generate_token } from "../utils/token";
import bcrypt from "bcrypt";
import { ZodError } from 'zod';
import { Context } from "hono";

// create new user 
export async function signup(req: Request): Promise<Response> {
    try {

        const body = await req.get("body");
        const parsed = signupSchema.safeParse(body);

        if (!parsed.success) {
          const issues = parsed.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
          }));

          return jsonResponse(
            apiError("Invalid input", 400, { issues }),
            400
          );
        }

        const { name, email, password } = parsed.data;
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return jsonResponse(apiError("User already exists!", 409), 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({ name, email, password: hashedPassword });
        const token = generate_token({ userId: user.id });

        return jsonResponse(
            apiSuccess(
                { token, user: { id: user.id, email: user.email } },
                "User created!"
            ),
            201
        );
    } catch (err) {
        console.error("Signup error: ", err);
        return jsonResponse(apiError("Internal server error", 500), 500);
    }
}

//login in user
export async function login(req: Request): Promise<Response> {
    try {
        const body = await req.get("body");
        const parsed = loginSchema.safeParse(body);

        
        if (!parsed.success) {
          const issues = parsed.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
          }));

          return jsonResponse(
            apiError("Invalid input", 400, { issues }),
            400
          );
        }

        const { email, password } = parsed.data;
        const user = await findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return jsonResponse(apiError("Invalid email or password", 401), 401);
        }

        const token = generate_token({ userId: user.id });

        return jsonResponse(
            apiSuccess(
                { token, user: { id: user.id, email: user.email } },
                "User logged in successfully!"
            ),
            200
        );
    } catch (err) {
        console.error("Login error: ", err);
        return jsonResponse(apiError("Internal server error", 500), 500);
    }
}

//FORGOT -- PASSWORD 
// --> /forgot-password [ send token too email ] 
// --> /new-password    [   add new password   ]


export async function forgot_password(req: Request): Promise<Response> {

    try{
        const body = req.get("body");
        const parsed = forgotPasswordSchema.safeParse(body);

        if (!parsed.success) {
          const issues = parsed.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
          }));

          return jsonResponse(
            apiError("Invalid input", 400, { issues }),
            400
          );
        }

        const { email } = parsed.data;
        const user = await findUserByEmail(email);

        if (!user) {
            return jsonResponse(apiError("Invalid email", 401), 401);
        }

        //DELETE THE TOKEN
         await deleteToken(user.id); 
        //GENERATE TOKEN
        const rawToken = nanoid();
        const hashedToken = await bcrypt.hash(rawToken, 10);

        //save in db 
        const savedToken = await saveToken(user.id, hashedToken);
        return jsonResponse(
            apiSuccess(
                { hashedToken},
                "Token send successfully!"
            ),
            200
        );
    }
    catch(err) {
        console.error("Error in forgot_password", err);
        return jsonResponse(apiError("Internal server error", 500), 500);
    }
}

export async function new_password(req: Request): Promise<Response> {

    try{
        const body = req.get("body");
        const parsed = newPasswordSchemaServer.safeParse(body);

        if (!parsed.success) {
          const issues = parsed.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
          }));

          return jsonResponse(
            apiError("Invalid input", 400, { issues }),
            400
          );
        }

        const { email, token, newPassword } = parsed.data;
        const user = await findUserByEmail(email);

        if (!user) {
            return jsonResponse(apiError("Invalid email", 401), 401);
        }
        // hash the token again 
        // so that i can match it 
        const isTokenAuthentic = await validateExpiryAndToken(user.id, token);
        if (!isTokenAuthentic) {
            return jsonResponse(
            apiError("Invalid Token or expired", 400) , 400
            )
        }
        // if he is authentica then save new password
        const updatedUser = await saveNewPassword(user.id, newPassword);   
         await deleteToken(user.id); 

        return jsonResponse(
            apiSuccess(
                {},
                "new password saved successfully!"
            ),
            200
        );
    }
    catch(err) {
        console.error("Error in forgot_password", err);
        return jsonResponse(apiError("Internal server error", 500), 500);
    }
}


export async function get_profile(c: Context): Promise<Response> {
  try {
    const userIdParam = c.req.param('userId');

    if (!userIdParam) {
      return jsonResponse(apiError("Missing user ID", 400), 400);
    }

    const userId = Number(userIdParam);
    if (isNaN(userId)) {
      return jsonResponse(apiError("Invalid user ID", 400), 400);
    }

    const user = await get_user_profile(userId); // uses the renamed DB function

    if (!user) {
      return jsonResponse(apiError("No user found for this userId", 404), 404);
    }

    return jsonResponse(
      apiSuccess({ user }, "User profile fetched successfully!"),
      200
    );
  } catch (err) {
    console.error("Error in getting profile:", err);
    return jsonResponse(apiError("Internal server error", 500), 500);
  }
}

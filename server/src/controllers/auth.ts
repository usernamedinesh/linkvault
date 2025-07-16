import { loginSchema, signupSchema, type Login, type Signup } from "shared";
import type { ApiResponse, ApiError } from "shared";
import { apiSuccess, apiError, jsonResponse } from "../utils/apiResponse";
import { AppError } from "../utils/CustomError";
import { findUserByEmail, createUser } from "../db/queries/user";
import { generate_token } from "../utils/token";
import bcrypt from "bcrypt";
import { ZodError } from 'zod';

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

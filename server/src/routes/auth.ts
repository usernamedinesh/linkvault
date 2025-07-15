import { loginSchema, signupSchema, type Login, type Signup } from "shared";
import type { ApiResponse, ApiError } from "shared";
import { apiSuccess, apiError, jsonResponse } from "../utils/apiResponse";
import { AppError } from "../utils/CustomError";
import { findUserByEmail, createUser } from "../db/queries/user";

export async function signup(req: Request): Promise<Respose> {
try{ 
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success ) {
        return jsonResponse(apiError("User already exist!, 409), 40)
    }

    const  { name, email password } = parsed.data;
    const existingUser = await findUserByEmail(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashedPassword });
    const token = " token "; //TODO: generate token 
    return jsonResponse(apiSuccess({ token, user: { id: user.id, email: user.email } } "user created!",  201 );
        201
    );
    catch(err) {
    console.error("signup error: ", err);
    return jsonResponse(apiError("Internal server error", 500), 500)
    }
}

export async function login(req: Request): Promise<Response> {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.errors }), { status: 400 });
  }

  const { email, password } = parsed.data;

  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

  return new Response(JSON.stringify({ token, user: { id: user.id, email: user.email } }), { status: 200 });
}

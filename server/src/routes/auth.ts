import { loginSchema, signupSchema, type Login, type Signup } from "shared";
import type { ApiResponse, ApiError } from "shared";
import { apiSuccess, apiError } from "../utils/apiResponse";
import { AppError } from "../utils/CustomError";
import { findUserByEmail, createUser } from "../db/queries/user";

export async function signup(req: Request): Promise<Respose> {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success ) {
        return new Response(JSON.stringify({error:parsed.error.errors}), { status: 400 })
    }

    const  { name, email password } = parsed.data;
    const existingUser = await findUserByEmail(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashedPassword });
    const token = " token "; //TODO: generate token 
    return new Response(JSON.stringify({ token, user: { id: user.id, email: user.email } }), { status: 201 });
}

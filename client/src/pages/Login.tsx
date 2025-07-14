import { useState } from "react";
import { loginSchema, type Login}  from "shared";
import {zodResolver } from "@hookform/resolvers/zod";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = loginSchema.safeParse({email, password});
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            });
            return;
        }
        const data: Login = result.data;
        console.log("Validated login data:", data);
    };

  return (
    <div id="login-form">
      <form onSubmit={handleSubmit}>
        <h1 className="mt-3 text-black text-xl font-semibold text-center">Login  👋</h1>

            <input
                type="email"
                placeholder="📧 Email"
                value={email}
                onChange={(e) => { setEmail(e.target.value)
                    if (errors.email) setErrors((prev) => ({...prev, email: undefined})) 
                }}
                required
                className="text-black"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <input
                type="password"
                placeholder="🔒 Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value)
                    if (errors.password) setErrors((prev) => ({...prev, password: undefined})) 
                }}
          required
          className="text-black"
        />
         {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <button type="submit" className="bg-pink-600 mt-3 text-white py-2 px-6 rounded hover:bg-pink-700 transition duration-200"
                >Login</button>
      </form>
    </div>
  );
}

export default Login;


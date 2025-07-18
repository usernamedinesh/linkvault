import { useState } from "react"
import {signupSchema, type Signup} from "shared";
import { client } from "../lib/client";
// import { zodResolver } from "@hookform/resolvers/zod"; 

function Signup(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        const result = signupSchema.safeParse({email, password, name });
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
                name: fieldErrors.name?.[0],
            });

            return;
        }
        const res = await client.api.auth.signup.$post({
            json: {
                email,
                password,
                name,
            }
        })
        const response = await res.json();
        if (response.status === 200) {
            localStorage.setItem("linkToken", response.data.token);
            alert(response.message);
            window.location.href = "/";
            // navigate("/");
        } else {
            alert(response.message);
        }
    };

    return(
        <>
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded  w-full max-w-md mx-auto">
                    <h1 className=" mt-3 text-black text-xl font-semibold text-center">Create Account 🚀</h1>

                    <input
                        type="text"
                        placeholder="👤 Name"
                        value={name}
                        onChange={(e) => {setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined}));
                        }}

                        required
                        className="text-black px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                     {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                    <input
                        type="email"
                        placeholder="📧 Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value)
                         if (errors.email) setErrors((prev) => ({...prev, email: undefined}));   
                        }}
                        required
                        className="text-black px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                     {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    <input
                        type="password"
                        placeholder="🔒 Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value)
                            if (errors.password) setErrors((prev) => ({...prev, password: undefined}));   
                        }}
                        required
                        className=" text-black px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                     {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

                    {/* ✅ Tailwind-styled button */}
                    <button
                        type="submit"
                        className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition duration-200"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </>
    )
}

export default Signup;

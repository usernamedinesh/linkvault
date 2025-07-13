import { useState } from "react"

function Signup(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    }

    return(
        <>
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded  w-full max-w-md mx-auto">
                    <h1 className=" mt-3 text-black text-xl font-semibold text-center">Create Account 🚀</h1>

                    <input
                        type="text"
                        placeholder="👤 Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="text-black px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="email"
                        placeholder="📧 Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="text-black px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="password"
                        placeholder="🔒 Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className=" text-black px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

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

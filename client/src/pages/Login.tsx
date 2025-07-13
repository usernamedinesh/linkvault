import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your login logic here
  };

  return (
    <div id="login-form">
      <form onSubmit={handleSubmit}>
        <h1 className="mt-3 text-black text-xl font-semibold text-center">Login  👋</h1>

        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-black"
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-black"
        />
        <button type="submit" className="bg-pink-600 mt-3 text-white py-2 px-6 rounded hover:bg-pink-700 transition duration-200"
                >Login</button>
      </form>
    </div>
  );
}

export default Login;


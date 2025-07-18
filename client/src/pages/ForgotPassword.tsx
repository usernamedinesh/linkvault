import { useState } from 'react';
import { useNavigate } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { client } from "../lib/client";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {theme} = useTheme();
    const token = "this_is_my_Token";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
        const res = await client.api.auth["forgot-password"].$post({
            json: {
                email,
            }
        })
        const response = await res.json();
        if (response.status === 200) {
            const token =  response.data.rawToken
                console.log("token", token);
            alert(response.message);
          // setsent(true);
          navigate(`/new-password/${token}`, { state: { email } });
        } else {
            alert(response.message);
        }
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-gray-50 px-4 

    ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'}
    `}>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="mt-5 text-center text-2xl text-black font-semibold">
          Forgot Password 🔑
        </h1>

        {sent ? (
          <p className="text-center text-black ">
            If an account exists for <strong>{email}</strong>, a reset link has
            been sent.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="📧 Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-5 text-black w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            {error && <p className=" text-black text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="mt-5 mb-10 text-black w-full rounded bg-pink-600 py-2 text-white transition hover:bg-pink-700 disabled:opacity-50"
              disabled={!email}
            >
              Send Reset Link
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;


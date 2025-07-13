import { useState } from 'react';
import { useNavigate } from "react-router";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const token = "this_is_my_Token";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
        //api call 
        //if reponse is ok then navigate to the page
        //where use can add new password
      setSent(true);
      navigate(`/new-password/${token}`)
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="text-center text-2xl font-semibold">
          Forgot Password 🔑
        </h1>

        {sent ? (
          <p className="text-center text-green-600">
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
              className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full rounded bg-pink-600 py-2 text-white transition hover:bg-pink-700 disabled:opacity-50"
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


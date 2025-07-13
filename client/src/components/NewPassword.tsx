import { useState } from 'react';
import { useParams } from "react-router";
import { useTheme } from "../context/ThemeContext";

//lets mak this page dynamic


const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const { theme } = useTheme();
  const {token} = useParams<{token: string}>();

  /* ───────────────────────────────────────── handle submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // basic checks
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // 👉 replace with your own API request
      // await api.resetPassword({ token, password });
      setDone(true);
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  /* ───────────────────────────────────────── view ── */
  return (
    <div className={`flex min-h-screen items-center justify-center bg-gray-50 px-4

    ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'}
            `}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="text-black mt-5 text-center text-2xl font-semibold">Reset Password 🔐</h1>

        {done ? (
          <p className="text-center text-green-600 text-black">
            Your password has been updated. You can now sign in with the new
            credentials.
          </p>
        ) : (
          <>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className=" text-black w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="mt-4 text-black w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="mt-4 mb-10 w-full rounded bg-pink-600 py-2 text-white transition hover:bg-pink-700 disabled:opacity-50"
              disabled={!password || !confirm}
            >
              Save New Password
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;

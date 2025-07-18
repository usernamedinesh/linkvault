import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { client } from "../lib/client";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [countdown, setCountdown] = useState(3); // countdown timer
  const { theme } = useTheme();
  const { token } = useParams<{ token: string }>();
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  /* ───────────────────────── handle submit ───────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await client.api.auth["new-password"].$post({
        json: {
          email,
          newPassword: password,
          token,
        }
      });

      const response = await res.json();

      if (response.status === 200) {
        setDone(true); // show success message
      } else {
        alert(response.message);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  /* ───────────────────────── Countdown redirect ───────────────────────── */
  useEffect(() => {
    if (!done) return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [done, navigate]);

  /* ───────────────────────── View ───────────────────────── */
  return (
    <div className={`
      flex min-h-screen items-center justify-center px-4
      ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'}
    `}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="text-black mt-5 text-center text-2xl font-semibold">Reset Password 🔐</h1>

        {done ? (
          <div className="text-center text-green-600 font-medium">
            <p>Your password has been updated successfully.</p>
            <p>Redirecting in {countdown} second{countdown > 1 ? 's' : ''}...</p>
          </div>
        ) : (
          <>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-black w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
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


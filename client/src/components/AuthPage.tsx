import { useState } from 'react';
import './Auth.css';               // Important: this must include your `.container`, `.right-panel-active`, etc.
import LoginForm from '../pages/Login';
import SignupForm from '../pages/Signup';
import { useTheme } from "../context/ThemeContext";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`flex items-center justify-center min-h-screen bg-gray-100 px-4
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'} `}
     >

      {/* ✅ DESKTOP/TABLET VERSION — uses your animation CSS */}
      <div className="hidden sm:block w-full max-w-[768px]">
        <div
          id="container"
          className={`container w-full ${isSignUp ? 'right-panel-active' : ''}`}
        >
          {/* Sign Up Panel */}
          <div className="form-container sign-up-container">
            <SignupForm />
          </div>

          {/* Sign In Panel */}
          <div className="form-container sign-in-container">
            <LoginForm />
          </div>

          {/* Animated Overlay */}
          <div className="overlay-container">
            <div className="overlay">
              {/* LEFT PANEL */}
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back 🎉</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="ghost border border-white px-6 py-2 mt-2 rounded transition hover:bg-white/10"
                >
                  Sign In
                </button>
              </div>

              {/* RIGHT PANEL */}
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend ✨</h1>
                <p>Enter your personal details and start your journey with us</p>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="ghost border border-white px-6 py-2 mt-2 rounded transition hover:bg-white/10"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MOBILE VERSION — raw layout, no animation */}
      <div className="block sm:hidden w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {isSignUp ? <SignupForm /> : <LoginForm />}
        <p className="mt-4 text-center text-sm">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="inline font-medium text-pink-600 hover:underline"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}


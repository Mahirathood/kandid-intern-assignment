// usre login
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { MdEmail, MdLock } from "react-icons/md";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    if (res?.error) setError("Invalid email or password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Continue with your account
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter your email and password to log in.
        </p>

        {/* Error message */}
        {error && (
          <p className="text-center text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Email/Password form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700">
            <MdEmail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="flex-1 bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700">
            <MdLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="flex-1 bg-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-6">
          New User?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Create New Account
          </Link>
        </p>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you agree to our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="underline">
            T&Cs
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

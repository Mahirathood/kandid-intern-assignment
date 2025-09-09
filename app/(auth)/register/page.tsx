// user register
"use client";

import { useState } from "react";
import Link from "next/link";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-xl font-semibold text-center mb-6">Create Account</h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Register with your email and password.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700">
            <MdPerson className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="flex-1 bg-transparent outline-none"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

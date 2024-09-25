"use client";

import fetchData from "@/utils/fetchData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await fetchData(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
      "POST",
      formData
    );

    if (!data) {
      alert("Failed to fetch data");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);

      if (data.role === "seller") {
        router.push("/seller/products");
      } else {
        router.push("/buyer/products");
      }
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="mt-4">
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="block border rounded p-2 mb-2 w-80"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="block border rounded p-2 mb-4 w-80"
          onChange={handleChange}
        />
        <button
          type="submit"
          onClick={handleLogin}
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <Link href="/signup" className="text-blue-500 underline">
          Sign Up
        </Link>
        <Link href="/resetpassword" className="text-blue-500 underline">
          Reset Password
        </Link>
      </div>
    </div>
  );
}

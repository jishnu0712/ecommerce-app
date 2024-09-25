"use client";

import Dropdown from '@/components/Dropdown';
import fetchData from '@/utils/fetchData';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({username: ''});


    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value }));
    }

    const handleReset = async (e) => {
        e.preventDefault();

        const data = await fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/resetpassword`, 'POST', formData);

        if (data) {
          alert('Password reset successful')
        } else {
          alert('signup failed')
        }
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Reset Password</h1>
      <form className="mt-4">
        <input
          type="text"
          placeholder="Username"
          name='username'
          className="block border rounded p-2 mb-2 w-80"
          onChange={handleChange}
        />
        
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
      <div className="mt-4">
        <Link href="/login" className="text-blue-500 underline">Login
        </Link>
        <Link href="/signup" className="text-blue-500 underline">Sign Up
        </Link>
      </div>
    </div>
  )
}

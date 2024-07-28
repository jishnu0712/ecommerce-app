"use client";

import Dropdown from '@/components/Dropdown';
import fetchData from '@/utils/fetchData';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({username: '', password: ''});


    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value }));
    }

    const onSelect = (e) => {
        setFormData(prev => ({...prev, role: e }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const data = await fetchData('http://localhost:8080/api/auth/signup', 'POST', formData);

        if (data.token) {
          localStorage.setItem('token', data.token)
          router.push('/seller/products')
        } else {
          alert('signup failed')
        }
    }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <form className="mt-4">
        <input
          type="text"
          placeholder="Username"
          name='username'
          className="block border rounded p-2 mb-2 w-80"
          onChange={handleChange}
        />
        <input
          type="password"
          name='password'
          placeholder="Password"
          className="block border rounded p-2 mb-4 w-80"
          onChange={handleChange}
        />

        <Dropdown options={["buyer", "seller"]} selected={formData.role} onSelect={onSelect}/>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4">
        <Link href="/login" className="text-blue-500 underline">Login
        </Link>
      </div>
    </div>
  )
}

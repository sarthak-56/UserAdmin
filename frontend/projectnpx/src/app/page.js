"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const UserCheck = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({ email: '', pasword: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3009/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Login Successfully...')
                router.push('/dashboard')
            }
            else {
                alert('Invalid username & password')

            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-3/4 mx-auto border border-gray-300 p-6 mt-4 sm:w-1/2 md:w-3/4 rounded-lg'>
                <h1 className='text-blue-900 font-bold text-4xl text-center mb-6'>Login</h1>
                <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:outerline-none' placeholder='Enter your email' type="email" name="email" value={formData.email} onChange={handleChange} />
                <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:outerline-none' placeholder='Enter your password' type="password" name="pasword" value={formData.pasword} onChange={handleChange} />
                <button className='bg-blue-500  mx-auto w-1/2 p-2 sm:1/2 md:w-1/4 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300' type="submit">Login</button>
                <h1 className="p-3 w-full font-bold rounded-lg border-blue-800 border-2 text-blue-800 bg-blue-300 " >If you are not able to Login then <a href="/adduser" className='font-bold text-xl'>"Click here"</a> and create your account</h1>
            </form>
        </div>
    );
};

export default UserCheck;

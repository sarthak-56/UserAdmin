"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const FormComponent = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),

      });

      if (response.ok) {
        alert('Signup Successfully...')
        router.push('/');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (

    <form className='flex flex-col gap-6 w-3/4 mx-auto border border-gray-300 p-6 mt-4 sm:w-1/2 md:w-3/4 rounded-lg'>
      <h1 className='text-blue-900 font-bold text-4xl text-center mb-6'>Add User</h1>
      <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500' placeholder='Enter your name' type="text" name="name" onChange={handleChange} />
      <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500' placeholder='Enter your username' type="text" name="username" onChange={handleChange} />
      <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500' placeholder='Enter your email' type="email" name="email" onChange={handleChange} />
      <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500' placeholder='Enter your password' type="password" name="pasword" onChange={handleChange} />
      <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500' placeholder='Choose your role' type="text" name="role" onChange={handleChange} />
      <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500' placeholder='Enter your address' type="text" name="address" onChange={handleChange} />

      <button className='bg-blue-500  mx-auto w-1/2 p-2 sm:1/2 md:w-1/4 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300' type="submit" onClick={handleSubmit}>Add</button>

    </form>

  );
};

export default FormComponent;
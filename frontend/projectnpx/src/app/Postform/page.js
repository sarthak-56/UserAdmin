"use client"
import React, { useState } from 'react';

const Page = () => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null); // For file input

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, username, email, password, role, address, profileImage });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <div className="flex flex-col md:flex-row  ">
      <form className="bg-white p-6 rounded-md" onSubmit={handleSubmit} style={{ maxWidth: '50%', margin: '0 auto' }}>
        <div className='mb-2'>
          <input
            className='w-full bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Enter your name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <input
            className='w-full bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Enter your username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <input
            className='w-full bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Enter your email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <input
            className='w-full bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Enter your password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <input
            className='w-full bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Choose your role'
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <input
            className='w-full bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Enter your address'
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <input
            className='w-full bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Upload your profile image'
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div className='mb-2'>
          <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded">Save</button>
        </div>
      </form>

      <div className="flex-1 w-full" style={{ maxWidth: '50%', margin: '0 auto' }}>
        <div className="bg-white rounded-md p-6 shadow-md">

          <div className="flex justify-center mb-4">
            <img src={profileImage ? URL.createObjectURL(profileImage) : ''} alt="Profile" className="h-{500} w-{500} " />
          </div>
          <h2 className="text-2xl font-bold text-center">{name}</h2>
          <p className="text-gray-600 text-center">{username}</p>
          <div className="mt-6">
            <p className="text-gray-600">Email:</p>
            <p className="font-semibold">{email}</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">Role:</p>
            <p className="font-semibold">{role}</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">Address:</p>
            <p className="font-semibold">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

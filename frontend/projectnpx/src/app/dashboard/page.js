"use client"
import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3009/data');
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error('Failed to fetch user details:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCancel = (e) => {
    setShowEditModal(false);
  }

  const closeModal = () => {
    setShowEditModal(false);
    fetch(`http://localhost:3009/data/${selectedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedUser),
    })
      .then(response => {
        if (response.ok) {

          console.log('User data updated successfully');
          setShowEditModal(false);
        } else {

          console.error('Failed to update user data:', response.status);
        }
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  const handleRemove = () => {
    console.log(selectedUser.id)
    fetch(`http://localhost:3009/data/${selectedUser.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.ok) {

          console.log('User data deleted successfully');
          setShowEditModal(false);
        } else {

          console.error('Failed to delete user data:', response.status);
        }
      })
      .catch(error => {
        console.error('Error deleting user data:', error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row">

      <div className="overflow-y-scroll h-screen flex-1">
        <table className="bg-white rounded-lg w-full">

          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="py-3 px-2 md:px-4 lg:px-6">Name</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {data.map((user, index) => (
              <tr key={index} className={(index + 1) % 2 === 0 ? "bg-yellow-100" : ""} onClick={() => handleRowClick(user)}>
                <td className="py-2 px-2 font-bold md:px-4  lg:px-6">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex-1 ml-4">
        {selectedUser && (
          <div className="bg-yellow-100 border-4 border-yellow-500 rounded-md p-6 shadow-md">
            <div className="flex justify-center">
              {selectedUser.profileImageData && (
                <img src={`data:image/png;base64,${selectedUser.profileImageData}`} alt="Profile" className="h-48 w-48 rounded-full" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-center mt-4">{selectedUser.name}</h2>
            <p className="text-gray-600 text-center">{selectedUser.username}</p>
            <div className="mt-6">
              <p className="text-gray-600">Email:</p>
              <p className="font-semibold">{selectedUser.email}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Role:</p>
              <p className="font-semibold">{selectedUser.role}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Address:</p>
              <p className="font-semibold">{selectedUser.address}</p>
            </div>
            <div className="flex justify-between mt-6">
              <button className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded border border-blue-500" onClick={handleEdit}>Edit</button>
              <button className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded border border-red-500" onClick={handleRemove}>Remove</button>
            </div>
          </div>
        )}
      </div>


      {showEditModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white flex flex-col bg-grey-400 p-6 w-3/4 md:w-1/4 gap-2 border-4 border-purple-900 rounded-md">
            <input className='bg-purple-300 border-2 border-purple-500 px-3 py-2 rounded-lg focus:outline-none hover:border-purple-900 border-2'  value={selectedUser.name || ''} placeholder='Enter your name' type="text" name="name" onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
            <input className='bg-purple-300 border-2 border-purple-500 px-3 py-2 rounded-lg focus:outline-none hover:border-purple-900 border-2'  value={selectedUser.username || ''} placeholder='Enter your username' type="text" name="username" onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} />
            <input className='bg-purple-300 border-2 border-purple-500 px-3 py-2 rounded-lg focus:outline-none hover:border-purple-900 border-2'  value={selectedUser.email || ''} placeholder='Enter your email' type="email" name="email" onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
            <input className='bg-purple-300 border-2 border-purple-500 px-3 py-2 rounded-lg focus:outline-none hover:border-purple-900 border-2'  value={selectedUser.pasword || ''} placeholder='Enter your password' type="password" name="pasword" onChange={(e) => setSelectedUser({ ...selectedUser, pasword: e.target.value })} />
            <input className='bg-purple-300 border-2 border-purple-500 px-3 py-2 rounded-lg focus:outline-none hover:border-purple-900 border-2'  value={selectedUser.role || ''} placeholder='Choose your role' type="text" name="role" onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })} />
            <input className='bg-purple-300 border-2 border-purple-500 px-3 py-2 rounded-lg focus:outline-none hover:border-purple-900 border-2'  value={selectedUser.address || ''} placeholder='Enter your address' bdgwr type="text" name="address" onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })} />


            <button className="bg-purple-900 text-white font-semibold py-2 mt-4 px-4 rounded" onClick={closeModal}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

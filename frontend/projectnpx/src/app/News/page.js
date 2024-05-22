"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Image from "next/image";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

function Home() {

  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModal, setEditModal] = useState(false)
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://server-for-quiver.onrender.com/todays_news_web');
      if (response.status === 200) {
        setData(response.data.posts);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const closeModal = () => {
    setEditModal(false);
    fetch(`https://server-for-quiver.onrender.com/todays_news_web/${selectedItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedItem),
    })
      .then(response => {
        if (response.ok) {

          console.log('News updated Successfully...');
          setEditModal(false);
        } else {

          console.error('Failed to update news data:', response.status);
        }
      })
      .catch(error => {
        console.error('Error updating for news data:', error);
      });
  };



  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  const handleClick = () => {
    setEditModal(true)
  }

  return (
    <div className=" flex flex-col md:flex-row lg:flex-row w-full container mx-auto flex">
      <div className="w-full md:w-1/2 lg:w-1/2 overflow-y-scroll max-h-screen">
        <h1 className="md:text-2xl font-bold">Data from API</h1>
        <ul>
          {data.map((item, index) => (
            <div key={index} className=" border rounded p-4">
              <div>
                <li className=" font-bold text-xl md:text-4xl cursor-pointer" onClick={() => handleRowClick(item)}> {item.title} </li>
              </div>
            </div>
          ))}
        </ul>
      </div>

      <div className="md:w-1/2 overflow-y-scroll h-screen">
        {selectedItem && (
          <div className="border rounded p-4">
            <button className="flex flex-1 float-end bg-blue-400 hover:bg-blue-700  text-white font-semibold px-4" onClick={handleClick}>Edit</button>
            {/* <h2 className="text-2xl font-bold ">Selected Item Details</h2> */}
            <p className="text-2xl"> {selectedItem.title}:</p>
            {/* <p>ID: {selectedItem.id}</p> */}
            <p> {selectedItem.content}</p>
            <p className="font-bold">Author: {selectedItem.author}</p>
            <p className="font-semibold">Posted At: {selectedItem.posted_at}</p>
            {/* <p className="font-">YouTube Link: {selectedItem.youtube_link}</p> */}
            <p className="font-bold">Slug: {selectedItem.slug}</p>
            <p className="font-extrabold">Categories: {selectedItem.categories}</p>
            <div>
              <Image src={selectedItem.image} width={600} height={500} alt="Picture of the author" />
            </div>
          </div>
        )}
        {editModal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white flex flex-col bg-grey-400 p-8 rounded-md w-3/4 md:1/2">
              <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500' value={selectedItem.title || ''} placeholder='Enter your name' type="text" name="title" onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })} />
              <textarea className='bg-gray-100 border border-gray-300 px-4 py-8 rounded-lg mb-4 focus:outline-none focus:border-blue-500' value={selectedItem.content || ''} placeholder='Enter your username' type="text" name="content" onChange={(e) => setSelectedItem({ ...selectedItem, content: e.target.value })} />
              <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500' value={selectedItem.author || ''} placeholder='Enter your email' type="email" name="author" onChange={(e) => setSelectedItem({ ...selectedItem, author: e.target.value })} />
              <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500' value={selectedItem.posted_at || ''} placeholder='Enter your password' type="text" name="posted_at" onChange={(e) => setSelectedItem({ ...selectedItem, posted_at: e.target.value })} />
              <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500' value={selectedItem.slug || ''} placeholder='Choose your role' type="text" name="slug" onChange={(e) => setSelectedItem({ ...selectedItem, slug: e.target.value })} />
              <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500' value={selectedItem.categories || ''} placeholder='Enter your address' type="text" name="categories" onChange={(e) => setSelectedItem({ ...selectedItem, categories: e.target.value })} />
              <input className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500' placeholder='Upload your profile image' type="file" name="image" onChange={(e) => handleImgSubmit(e)} />

              <button className="bg-green-500 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded" onClick={closeModal}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
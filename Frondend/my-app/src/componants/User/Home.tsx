import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Home() {


const navigate=useNavigate()
  const token = localStorage.getItem('token');

  const logoutPage = () => {
    axios.get('http://localhost:5000/api/users/logout', {
      headers: { Authorization: token }
    })
      .then(response => {
        if (response.data === "logout") {
          localStorage.removeItem('token');
          navigate('/');
        } else {
          navigate('/home');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600'>
      <div className='text-center bg-white p-8 rounded-lg shadow-lg max-w-md'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Welcome To Home Page</h1>
        <p className='text-gray-600 mb-6'>You have successfully logged in.</p>
        <button onClick={logoutPage} className='px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-300'>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home;


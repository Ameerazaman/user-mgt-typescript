import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  email: string;
  password: string;
  username?: string; // Optional field
  profilepicture?: string; // Optional field
}

function DashBoard() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/dashboard', {
      // headers: { Authorization: token }
    })
      .then(response => {
        console.log(response.data);
        setUsers(response.data.userData);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
        navigate('/admin');
      });
  }, [navigate]);

  const editUser = (id: string) => {
    navigate(`/edit-user/${id}`);
  };

  const deleteUser = (id: string) => {
    axios.delete(`http://localhost:5000/api/admin/delete-user/${id}`, {
      headers: { Authorization: token }
    })
      .then(response => {
        if (response.data.success === false) {
          alert('User not found');
        } else {
          setUsers(users.filter(user => user._id !== id));
          alert('User deleted');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const logout = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/admin/logout', {
            headers: { Authorization: token }
        });

        console.log(response.data, "response when logout");

        if (response.data === 'logout') { // Adjust based on your actual backend response
            localStorage.removeItem('token');
            navigate('/adminLogin'); // Redirect to login page
        } else {
            console.error('Unexpected response:', response.data);
            navigate('/dashboard'); // Fallback
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-end mb-4">
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 border-b">No</th>
                {/* <th className="px-4 py-2 border-b">Username</th> */}
                {/* <th className="px-4 py-2 border-b">Image</th> */}
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Password</th>
                <th className="px-4 py-2 border-b">Edit</th>
                <th className="px-4 py-2 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  {/* <td className="px-4 py-2 border-b">{user.username}</td> */}
                  {/* <td className="px-4 py-2 border-b">
                    {user.profilepicture ? (
                      <img
                        className="w-12 h-12 object-cover rounded"
                        src={`http://localhost:5000/${user.profilepicture}`}
                        alt="Profile"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td> */}
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.password}</td>
                  <td className="px-4 py-2 border-b text-blue-500 cursor-pointer">
                    <button onClick={() => editUser(user._id)} className="fa fa-edit">Edit</button>
                  </td>
                  <td className="px-4 py-2 border-b text-red-500 cursor-pointer">
                    <button onClick={() => deleteUser(user._id)} className="fa fa-trash">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;

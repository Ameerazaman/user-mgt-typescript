import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditUser() {
    const { id } = useParams(); // Changed from email to id
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [prev, setPrevUser] = useState({
        email: '',
        password: '',
        username: '',
        phone: '',
        id: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/admin/edit-user/${id}`, { headers: { Authorization: token } })
            .then(response => {
                console.log(response.data)
                setPrevUser(response.data.userData);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [id, token]);

    const validate = () => {
        const new_errors = {};
        if (!prev.email) new_errors.email = "Email is required";
        if (!prev.password) new_errors.password = "Password is required";
        if (/\s/.test(prev.password)) new_errors.password = "Password should not contain spaces";
        if (prev.password.length < 5) new_errors.password = "Password must be at least 6 characters long";
        return new_errors;
    };

    const handlechange = (e) => {
        const { name, value } = e.target;
        setPrevUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5000/api/admin/edit-user/${id}`, {
                email: prev.email,
                username: prev.username,
                phone: prev.phone,
                password: prev.password
            }, { headers: { Authorization: token } });

            if (response.data.success && response.data.userData) {
                navigate('/dashboard');
            } else {
                setErrors({ general: response.data.message || "Error updating user" });
                alert(response.data.message || "Error updating user");
                navigate(`/edit-user/${id}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit User</h2>
                {errors.general && <span className="text-red-500 block text-center mb-4">{errors.general}</span>}
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        {errors.email && <span className="text-red-500 block mb-2">{errors.email}</span>}
                        <input
                            onChange={handlechange}
                            value={prev.email}
                            name="email" // Ensure this matches the state property name
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        />

                    </div>
                    <div>
                        {errors.password && <span className="text-red-500 block mb-2">{errors.password}</span>}
                        <input
                            onChange={handlechange}
                            value={prev.password}
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUser;

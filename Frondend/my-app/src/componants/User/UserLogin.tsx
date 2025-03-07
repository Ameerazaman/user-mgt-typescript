import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

// Helper function to check for spaces in a string
const hasSpaces = (str: string) => {
    return /\s/.test(str);
};
function UserLogin() {
    const navigate=useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Reset errors
        setEmailErr('');
        setPasswordErr('');
    
        try {
            let valid = true;
    
            // Validate email
            if (email.trim() === '') {
                setEmailErr('Email is required');
                valid = false;
            } else if (!isValidEmail(email)) {
                setEmailErr('Invalid email format');
                valid = false;
            } else if (hasSpaces(email)) {
                setEmailErr('Email should not contain spaces');
                valid = false;
            }
    
            // Validate password
            if (password.trim() === '') {
                setPasswordErr('Password is required');
                valid = false;
            } else if (hasSpaces(password)) {
                setPasswordErr('Password should not contain spaces');
                valid = false;
            }
    
            // If all validations pass
            if (valid) {
                // Send data to backend API
                console.log("API is calling");
    
                const response = await axios.post(
                    'http://localhost:5000/api/users/signIn',
                    { email, password },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );
    
                console.log('Sign-in successful:', response.data);
                navigate("/home");
            }
        } catch (err) {
            console.log("Error in userSignIn", err);
        }
    };
    
   
  return (
    <div>
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form onSubmit={submitForm} className="space-y-4 md:space-y-6" action="#" method='post'>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <span className="text-red-500 dark:text-red-300">{emailErr}</span>

                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <span className="text-red-500 font-small dark:text-red-300">{passwordErr}</span>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        

                        <button type="submit" className="w-full text-white bg-blue-600 font-medium hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Sign in
                        </button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            you have an account? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
  )
}

export default UserLogin

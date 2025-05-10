'use client';
import React, { useState } from 'react';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { client } from '@/utils/pocketbase';
import "../globals.css";
import { useAuth } from '@/context/authProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    // const router = useRouter();
    const { handleLogin } = useAuth();  //handleLogin is a function that logs in the user authProvider.js

    //comment

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await client.collection('users').authWithPassword(email, password);
    //         const user = client.authStore.model;
    //         if (user.role === 'admin') {
    //             router.push('/admin');
    //         } else {
    //             router.push('/todo');
    //         }
    //     } catch (err) {
    //         alert('Login failed: Invalid email or password.');
    //     }
    // };

    //comment

    // onSubmit={(e)=> {e.preventDefault(); handleLogin(email,password)}}

    return (
        <div className="flex pt-45 pb-45 items-center justify-center bg-gray-800">
            {/* <div className='flex'> */}
            {/* <div> */}
            <Image
                className='image'
                src="/girlImage.png"
                alt="Image"
                width={180}
                height={38}
            />
            {/* </div> */}
            {/* Form for User Login */}
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(email, password, role) }} className="bg-gray-300 p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center sm:text-2xl sm:font-bold sm:mb-4 sm:text-center">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />
                <div>
                    <select name="" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User Login</option>
                        <option value="admin" >Admin Login</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Login
                </button>
                <div className="mt-4 text-center text-sm">
                    {/* Link to move SignUp Page */}
                    <a href="/signup" className="text-blue-500 hover:underline block">
                        New here? Create an account
                    </a>
                    {/* Link to move Forget Password Page */}
                    <a href="/forget-password" className="text-blue-500 hover:underline block mt-1">
                        Forgot password?
                    </a>
                </div>
            </form>
            {/* </div> */}
        </div>
    );
};

export default Login;
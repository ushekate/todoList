'use client';
import React, { useState } from 'react';
import { client } from '@/utils/pocketbase';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            await client.collection('users').requestPasswordReset(email);
            setMessage('Password reset Email sent. Check your Inbox.');
        } catch (err) {
            setMessage('Failed to send reset email.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <form onSubmit={handleReset} className="bg-gray-300 p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
                <input
                    type="email"
                    placeholder="Your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />
                <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded">
                    Send Reset Link
                </button>
                <div className='text-center mt-4'>
                            <a href="/login" className='text-blue-500'>
                                Login
                            </a>
                    </div>
                {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
            </form>
        </div>
    );
};

export default ForgetPasswordPage;
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { client } from '@/utils/pocketbase';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await client.collection('users').create({
                email,
                password,
                passwordConfirm: confirmPassword,
                emailVisibility: true,
            });
        
            alert('Signup successful. Please log in.');
            router.push('/login');
        } catch (err) {
            console.error('Signup failed:', err);
            alert('Signup failed: ' + (err?.response?.data?.message || err.message || 'Unknown error'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <form onSubmit={handleSignup} className="bg-gray-300 p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
                    Create Account
                </button>
                <div className="mt-4 text-center text-sm">
                    <a href="/login" className="text-blue-500 hover:underline">
                        Already have an account? Login
                    </a>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;


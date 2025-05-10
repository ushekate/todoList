
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { client, loginpb } from '@/utils/pocketbase';
// import { LOGIN_COLLECTION } from '@/utils/constants';


const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const router = useRouter();

    const fetchUsers = async () => {
        try {
            const records = await client.collection('users').getFullList({
                sort: '-created',
                // expand: 'user',
            });
            setUsers(records);
        } catch (error) {
            console.log('Error fetching users:', error);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    //new
    const handlePermissionChange = async (userId, field, value) => {
        try {
            const user = users.find(u => u.id === userId);
            await client.collection('users').update(userId, {
                ...user,
                [field]: value,
            });
            fetchUsers();
        } catch (err) {
            console.log('Error updating permissions:', err);
        }
    };
    //new

    return (
        <div className="p-8">
            <div className='flex justify-between'>
                <h1 className="text-3xl font-bold mb-6">Admin Panel - Manage All Users</h1>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                {users.length === 0 ? (
                    <p>No Users found.</p>
                ) : (
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-200 rounded-2xl text-left">
                                <th>#</th>
                                <th>Users</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, index) => (
                                <tr key={u.id}>
                                    <td>{index + 1}</td>
                                    <td>{u.email}</td>
                                    <td>{new Date(u.created).toLocaleString()}</td>
                                    <td className="space-x-4">
                                        <label className="mr-2">
                                            <input
                                                type="checkbox"
                                                className="mr-1"  
                                                checked={u.can_view}        //new
                                                onChange={e => handlePermissionChange(u.id, 'can_view', e.target.checked)}  //new
                                            /> View
                                        </label>
                                        <label className="mr-2">
                                        <input
                                                type="checkbox"
                                                className="mr-1"  
                                                checked={u.can_create}        //new
                                                onChange={e => handlePermissionChange(u.id, 'can_create', e.target.checked)}  //new
                                            /> Create
                                        </label>
                                        <label className="mr-2">
                                        <input
                                                type="checkbox"
                                                className="mr-1"  
                                                checked={u.can_update}        //new
                                                onChange={e => handlePermissionChange(u.id, 'can_update', e.target.checked)}  //new
                                            /> Update
                                        </label>
                                        <label>
                                        <input
                                                type="checkbox"
                                                className="mr-1"  
                                                checked={u.can_delete}        //new
                                                onChange={e => handlePermissionChange(u.id, 'can_delete', e.target.checked)}  //new
                                            /> Delete
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className='flext text-center mt-4'>
                <a href="/login" className='text-xl font-bold bg-gray-300 m-2 mb-6 px-2 py-1 rounded'>
                    Login
                </a>
                <a href="/login" className='text-xl font-bold bg-gray-300 m-2 mb-6 px-2 py-1 rounded'>
                    Back
                </a>
            </div>
        </div>
    );
};

export default AdminPanel;
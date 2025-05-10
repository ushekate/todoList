'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { client } from '@/utils/pocketbase';
import { TEST_COLLECTION } from '@/utils/constants';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';

const AddTask = () => {
    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const { handleSubmit, register, reset } = useForm();
    const router = useRouter();

    // useEffect(() => {
    //     if (!client.authStore.isValid) {
    //         router.push('/login');
    //     } else {
    //         const user = client.authStore.model;
    //         setCurrentUser(user);
    //         fetchTasks(user.id);
    //     }
    // }, []);

    //new
    useEffect(() => {
        if (!client.authStore.isValid) return;

        const user = client.authStore.model;
        if (!user.can_view) {
            alert("You don't have permission to view tasks.");
            return;
        }

        setCurrentUser(user);
        fetchTasks(user.id);
    }, []);
    //new

    const fetchTasks = async (userId) => {
        try {
            const records = await client.collection(TEST_COLLECTION).getFullList({
                sort: '-created',
                filter: `user = "${userId}"`,
            });
            setTasks(records);
        } catch (error) {
            console.log('Error fetching tasks:', error);
        }
    };

    const submitHandler = async (data) => {
        const userId = currentUser?.id;

        if (!userId) return alert("User not authenticated");
        if (!currentUser?.can_create) return alert("You are not allowed to create tasks.");

        try {
            await client.collection(TEST_COLLECTION).create({
                ...data,
                user: userId,
            });
            reset();
            await fetchTasks(userId);
            alert('Task added successfully');
        } catch (err) {
            console.log('Error adding task:', err.response || err);
            alert('Failed to add task');
        }
    };


    // const submitHandler = async (data) => {
    //     try {
    //         const userId = currentUser?.id;
    //         if (!userId) return alert("User not authenticated");

    //         await client.collection(TEST_COLLECTION).create({
    //             ...data,
    //             user: userId,
    //         });
    //         reset();
    //         await fetchTasks(userId);
    //         alert('Task added successfully');
    //     } catch (err) {
    //         console.log('Error adding task:', err.response || err);
    //         alert('Failed to add task');
    //     }
    // };

    const handleDelete = async (id) => {
        try {
            await client.collection(TEST_COLLECTION).delete(currentUser.id);
            setTasks(prev => prev.filter(task => task.id !== currentUser.id));
        } catch (err) {
            console.log('Error deleting task:', err.response || err);
            alert('Failed to delete task');
        }
    };

    const handleEdit = (id, currentText) => {
        setEditingId(id);
        setEditedText(currentText);
    };

    const handleUpdate = async (id) => {
        try {
            await client.collection(TEST_COLLECTION).update(currentUser.id, { task: editedText });
            setEditingId(null);
            setEditedText('');
            await fetchTasks(currentUser.id);
        } catch (err) {
            console.log('Error updating task:', err.response || err);
            alert('Failed to update task');
        }
    };

    return (
        <div className="todo mt-4 justify-center mx-auto w-120">
            <div className='border rounded-2xl bg-gray-800 w-110 px-8 m-4'>
                <h1 className="text-2xl text-white font-bold mt-20 mb-4 justify-center"> TODOs List </h1>

                {currentUser?.can_create ? (
                    <form onSubmit={handleSubmit(submitHandler)} className="mb-4">
                        <input
                            type="text"
                            {...register('task', { required: true })}
                            placeholder="Enter a new task"
                            className="border border-white text-white px-4 py-2 rounded-2xl w-full mb-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                            Add New Task
                        </button>
                    </form>
                ) : (
                    <p className="text-white mb-4">You do not have permission to create tasks.</p>
                )}

                <div>
                    <button
                        onClick={() => {
                            client.authStore.clear();
                            router.push('/login');
                        }}
                        className="text-white bg-red-500 px-4 py-2 rounded mb-4">
                        Logout
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 w-110">
                <h2 className="text-lg font-semibold mb-2">My Tasks</h2>
                {tasks.length === 0 ? (
                    <p>No records found.</p>
                ) : (
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th>#</th>
                                <th>Task</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((rec, index) => (
                                <tr key={rec.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {editingId === rec.id ? (
                                            <input
                                                type="text"
                                                value={editedText}
                                                onChange={(e) => setEditedText(e.target.value)}
                                                className="border px-2 py-1 rounded"
                                            />
                                        ) : (
                                            rec.task
                                        )}
                                    </td>
                                    <td>{new Date(rec.created).toLocaleString()}</td>
                                    <td className="flex gap-2">
                                        {editingId === rec.id ? (
                                            <button
                                                onClick={() => handleUpdate(rec.id)}
                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(rec.id, rec.task)}
                                                className="px-2 py-1 rounded"
                                            >
                                                <CiEdit size={25} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(rec.id)}
                                            className="px-2 py-1 rounded"
                                        >
                                            <MdDelete size={25} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AddTask;


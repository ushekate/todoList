'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminpb, client } from '@/utils/pocketbase';
import { ADMIN_COLLECTION } from '@/utils/constants';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await adminpb.collection(ADMIN_COLLECTION).authWithPassword(email, password);
            const user = adminpb.authStore.model;
            if (user.role === 'admin') {
                router.push('/login');
            } else {
                router.push('/admin');
            }
        } catch (err) {
            alert('Login failed: Invalid email or password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <form onSubmit={handleLogin} className="bg-gray-300 p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
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
                <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">
                    Login
                </button>
                <div className="mt-4 text-center">
                     <a href="/login" className="text-sm text-blue-500 hover:underline">
                         User Login
                     </a>
                 </div>
            </form>
        </div>
    );
};

export default AdminLoginPage;











// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { client } from '@/utils/pocketbase';

// const AdminLoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const router = useRouter();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await client.collection('users').authWithPassword(email, password);
//             const user = client.authStore.model;
//             if (user.role === 'admin') {
//                 router.push('/admin');
//             } else {
//                 alert('Access denied: not an admin user');
//                 client.authStore.clear();
//             }
//         } catch (err) {
//             alert('Login failed');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-800">
//             <form onSubmit={handleLogin} className="bg-gray-300 p-8 rounded-lg shadow-md w-80">
//                 <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
//                 <input
//                     type="email"
//                     placeholder="Admin Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full mb-4 px-4 py-2 border rounded"
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full mb-4 px-4 py-2 border rounded"
//                     required
//                 />
//                 <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">
//                     Login as Admin
//                 </button>
//                 <div className="mt-4 text-center">
//                     <a href="/login" className="text-sm text-blue-500 hover:underline">
//                         User Login
//                     </a>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AdminLoginPage;

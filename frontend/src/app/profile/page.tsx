'use client';
import { useState, useEffect } from 'react';
import ChangePasswordForm from '@/components/changePasswordForm';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    name: string;
     email: string;
}

export default function ProfilePage() {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [user, setUser] = useState<DecodedToken | null>(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);
    return (
        <div className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-950">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center shadow-md overflow-hidden">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold dark:text-white">{user?.name || 'User'}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{user?.email || 'your@email.com'}</p>
                    </div>
                    {!showChangePassword && (
                        <button
                            onClick={() => setShowChangePassword(true)}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Change Password
                        </button>
                    )}
                </div>

                {showChangePassword && (
                    <div className="mt-6">
                        <ChangePasswordForm />
                    </div>
                )}
            </div>
        </div>
    );
}

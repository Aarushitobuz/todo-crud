'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');
        if (newPassword !== confirmPassword) {
            setErrorMsg('New password and confirm password do not match.');
            return;
        }
        setLoading(true);
        try {
            const res = await api.put('/user/change-password', { oldPassword, newPassword,});
            setSuccessMsg(res.data.message || 'Password changed successfully');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            setErrorMsg(error.response?.data?.error || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
                <FiLock className="text-xl text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-xl font-semibold dark:text-white">Change Password</h2>
            </div>
            {successMsg && <p className="text-green-600 text-sm mb-2">{successMsg}</p>}
            {errorMsg && <p className="text-red-600 text-sm mb-2">{errorMsg}</p>}
            <form onSubmit={handleChangePassword} className="space-y-4">        
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showOld ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md pr-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        />
                        <button
                            type="button"
                            onClick={() => setShowOld(!showOld)}
                            className="absolute top-2.5 right-3 text-gray-600 dark:text-gray-300"
                        >
                            {showOld ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showNew ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-2 border rounded-md pr-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute top-2.5 right-3 text-gray-600 dark:text-gray-300"
                        >
                            {showNew ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md pr-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute top-2.5 right-3 text-gray-600 dark:text-gray-300"
                        >
                            {showConfirm ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Updating' : 'Change Password'}
                </button>
            </form>
        </div>
    );
}

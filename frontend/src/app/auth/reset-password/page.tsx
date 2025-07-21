'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const isPasswordValid = newPassword.length >= 6;
    const doPasswordsMatch = newPassword === confirmPassword;
    const isFormValid = token && isPasswordValid && doPasswordsMatch;

    useEffect(() => {
        if (!token) {
            setErrorMsg('Reset token is missing or invalid.');
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) 
            return;
        setErrorMsg('');
        setSuccessMsg('');
        setLoading(true);
        try {
            const res = await api.post('/auth/reset-password', { token, newPassword });
            setSuccessMsg(res.data.message);
            setTimeout(() => router.push('/auth/login'), 2500);
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            setErrorMsg(error.response?.data?.error || 'Reset failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Reset Password</h2>
                {errorMsg && <p className="text-red-500 mb-4 text-sm">{errorMsg}</p>}
                {successMsg && <p className="text-green-600 mb-4 text-sm">{successMsg}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            className={`w-full px-4 py-2 border rounded pr-10 dark:bg-gray-800 dark:text-white ${
                                newPassword && !isPasswordValid ? 'border-red-500' : ''
                            }`}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-300"
                            tabIndex={-1}
                        >
                            {showNewPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {!isPasswordValid && newPassword && (
                        <p className="text-red-500 text-sm -mt-2">Password must be at least 6 characters</p>
                    )}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            className={`w-full px-4 py-2 border rounded pr-10 dark:bg-gray-800 dark:text-white ${
                                confirmPassword && !doPasswordsMatch ? 'border-red-500' : ''
                            }`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-300"
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {!doPasswordsMatch && confirmPassword && (
                        <p className="text-red-500 text-sm -mt-2">Passwords do not match</p>
                    )}
                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className={`w-full py-2 rounded flex items-center justify-center transition ${
                            isFormValid
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-400 text-white cursor-not-allowed'
                        }`}
                    >
                        {loading ? (
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}

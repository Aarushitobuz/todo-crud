'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setErrorMsg('');

        if (!validateEmail(email)) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }

        setLoading(true);

        try {
            const res = await api.post('/auth/forgot-password', { email });
            setMessage(res.data.message);
            setEmail('');
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            setErrorMsg(error.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Forgot Password</h2>
                {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
                {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className={`w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white ${
                            errorMsg ? 'border-red-500' : ''
                        }`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Send Reset Link'
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                    Remember your password?{' '}
                    <Link href="/auth/login" className="text-blue-600 hover:underline">
                        Back to login
                    </Link>
                </p>
            </div>
        </main>
    );
}

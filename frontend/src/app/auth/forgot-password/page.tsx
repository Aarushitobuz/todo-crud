'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import Link from 'next/link';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
});

type FormData = yup.InferType<typeof schema>;

export default function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data: FormData) => {
        setMessage('');
        setErrorMsg('');
        setLoading(true);

        try {
            const res = await api.post('/auth/forgot-password', data);
            setMessage(res.data.message);
            reset();
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white ${
                                errors.email ? 'border-red-500' : ''
                            }`}
                            {...register('email')}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

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

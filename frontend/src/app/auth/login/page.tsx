'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        setErrorMsg('');
        setLoading(true);
        try {
            const res = await api.post('/auth/login', data);
            localStorage.setItem('token', res.data.token);
            router.push('/todos');
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            setErrorMsg(error.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Login</h2>
                {errorMsg && <p className="text-red-500 mb-4 text-sm">{errorMsg}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded pr-10 dark:bg-gray-800 dark:text-white"
                            {...register('password')}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-300"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                        <p className="text-sm text-right mt-2">
                            <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                                Forgot Password?
                            </Link>
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </main>
    );
}

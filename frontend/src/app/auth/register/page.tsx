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

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        setErrorMsg('');
        setLoading(true);
        try {
            await api.post('/auth/register', data);
            router.push('/auth/login');
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            setErrorMsg(error.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Register</h2>
                {errorMsg && <p className="text-red-500 mb-4 text-sm">{errorMsg}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                            {...register('name')}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                            {...register('email')}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Register'
                        )}
                    </button>
                 </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
}

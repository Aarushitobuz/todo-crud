'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    oldPassword: yup.string().required('Current password is required'),
    newPassword: yup
        .string()
        .required('New password is required')
        .min(6, 'New password must be at least 6 characters'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords do not match')
        .required('Please confirm your new password'),
});

type FormData = yup.InferType<typeof schema>;

export default function ChangePasswordForm() {
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setErrorMsg('');
        setSuccessMsg('');
        setLoading(true);
        try {
            const res = await api.put('/user/change-password', {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            });
            setSuccessMsg(res.data.message || 'Password changed successfully');
            reset();
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Current Password</label>
                    <div className="relative">
                        <input
                            type={showOld ? 'text' : 'password'}
                            {...register('oldPassword')}
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
                    {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">New Password</label>
                    <div className="relative">
                        <input
                            type={showNew ? 'text' : 'password'}
                            {...register('newPassword')}
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
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Confirm New Password</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            {...register('confirmPassword')}
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
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Change Password'}
                </button>
            </form>
        </div>
    );
}

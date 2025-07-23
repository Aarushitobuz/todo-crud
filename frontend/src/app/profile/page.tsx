'use client';
import { useEffect, useState } from 'react';
import { getUser } from '@/lib/user/getUser';
import { uploadProfilePhoto } from '@/lib/user/uploadPhoto';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                 setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };
        fetchUser();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) 
            return;
        try {
            const res = await uploadProfilePhoto(selectedFile);
            setUser(res.user);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const handleChangePassword = () => {
        router.push('/profile/change-password');
    };

    if (!user) {
        return (
            <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
                Loading...
            </div>
        );
    }
    const imageUrl = user.profilePhoto ? `http://localhost:3001/uploads/${user.profilePhoto}` : null;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md transition-all">
                <div className="mb-6 text-center">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-300 dark:border-gray-600 shadow"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto flex items-center justify-center text-gray-600 dark:text-gray-300 text-3xl">
                            ?
                        </div>
                    )}
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{user.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                </div>

                <div className="space-y-3">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="block w-full text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer focus:outline-none"
                    />
                    <button
                        onClick={handleUpload}
                        className="w-full bg-gray-500 hover:bg-gray-900 text-white px-4 py-2 rounded-xl transition"
                    >
                        Upload Photo
                    </button>
                    <button
                        onClick={handleChangePassword}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
}

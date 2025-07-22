'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  name: string;
  email: string;
  userId: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token) as DecodedToken;
      setUser(decoded);
    } catch (error) {
      console.error('Invalid token:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center mt-20 text-red-500">User not found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>

        <div className="mb-4">
          <p className="text-gray-600">Name:</p>
          <p className="text-lg font-medium">{user.name}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">Email:</p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>

        <button
          onClick={() => router.push('/change-password')}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

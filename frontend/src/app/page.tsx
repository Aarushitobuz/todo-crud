'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/todos');
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <h1 className="text-xl">Redirecting...</h1>
    </main>
  );
}

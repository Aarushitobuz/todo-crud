'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sun, Moon, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [tokenExists, setTokenExists] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setTokenExists(!!token);
    }, [pathname]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/auth/login');
    };

    const goToProfile = () => router.push('/profile');
    const goToTodos = () => router.push('/todos');

    if (!tokenExists) 
        return null;

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 dark:text-white shadow">
            <h1
                onClick={goToTodos}
                className="text-lg font-semibold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
                My Todo App
            </h1>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Toggle Theme"
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                    onClick={goToProfile}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Profile"
                >
                    <User size={18} />
                </button>
                <button
                    onClick={handleLogout}
                    className="p-2 rounded hover:bg-red-500 hover:text-white transition"
                    aria-label="Logout"
                >
                    <LogOut size={18} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
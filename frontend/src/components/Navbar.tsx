'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, LogOut } from 'lucide-react';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const router = useRouter();
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
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 dark:text-white">
            <h1 className="text-lg font-semibold">My Todo App</h1>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Toggle Theme"
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
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

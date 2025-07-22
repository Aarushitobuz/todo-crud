'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import TodoForm from '../../../components/TodoForm';

export default function NewTodoPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
            <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 transition-colors">
                <div className="mb-4">
                    <button
                        onClick={() => router.push('/todos')}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition"
                    >
                        ← Back to All Todos
                    </button>
                </div>
                <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
                    Add New Todo
                </h1>
                <TodoForm
                    editingTodo={null}
                    onSuccess={() => router.push('/todos')}
                />
            </div>
        </div>
    );
}

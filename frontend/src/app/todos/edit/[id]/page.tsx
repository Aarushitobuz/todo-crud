'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getTodo } from '../../../../lib/todo/getTodo';
import TodoForm from '../../../../components/TodoForm';
import { ITodo } from '../../../../lib/todo/types';

export default function EditTodoPage() {
    const { id } = useParams();
    const router = useRouter();
    const [todo, setTodo] = useState<ITodo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof id === 'string') {
            getTodo(id)
                .then((data) => {
                    setTodo(data);
                })
                .catch((err) => {
                    console.error('Todo not found:', err);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!todo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
                <p className="text-red-500 text-lg">Todo not found.</p>
            </div>
        );
    }

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
                    Edit Todo
                </h1>

                <TodoForm 
                    editingTodo={todo} 
                    onSuccess={() => router.push('/todos')} 
                />
            </div>
        </div>
    );
}

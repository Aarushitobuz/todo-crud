'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { listTodo } from '../../lib/todo/listTodo';
import { ITodo } from '../../lib/todo/types';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';
import { AxiosError } from 'axios';

export default function TodosPage() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const fetchTodos = useCallback(async () => {
        try {
            const res = await listTodo();
            setTodos(res);
            setError(null);
        } catch (err) {
            const axiosError = err as AxiosError;
            console.error('Error fetching todos:', axiosError);
            if (axiosError.response?.status === 401) {
                router.push('/auth/login');
            } else {
                setError('Something went wrong while fetching the todos. Please try again');
            }
        }
    }, [router]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">My Todos</h1>
            {error && (
                <div className="mb-4 p-4 text-red-800 bg-red-100 border border-red-300 rounded-md">
                    {error}
                 </div>
            )}
            <TodoForm editingTodo={editingTodo} onSuccess={() => { fetchTodos(); setEditingTodo(null); }} />
            <TodoList todos={todos} onEdit={setEditingTodo} onAction={fetchTodos} />
        </main>
    );
}

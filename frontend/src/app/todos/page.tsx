'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { listTodo } from '../../lib/todo/listTodo';
import { ITodo } from '../../lib/todo/types';
import TodoList from '../../components/TodoList';

export default function TodoPage() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const router = useRouter();

    const fetchTodos = async () => {
        const data = await listTodo();
        setTodos(data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="max-w-xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Your Todos</h1>
                <button
                    onClick={() => router.push('/todos/new')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Todo
                </button>
            </div>
            {/* <TodoList todos={todos} onEdit={(todo) => router.push(`/todos/edit/${todo._id}`)} onAction={fetchTodos} /> */}
            <TodoList todos={todos} onAction={fetchTodos} />
        </div>
    );
}

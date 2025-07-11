'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import { ITodo } from '../../lib/todo/types';
import { listTodo } from '../../lib/todo/listTodo';
import { postTodo } from '../../lib/todo/postTodo';
import { updateTodo } from '../../lib/todo/updateTodo';
import { deleteTodo } from '../../lib/todo/deleteTodo';

export default function TodosPage() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);
    const router = useRouter();
    const fetchTodos = useCallback(async () => {
        try {
            const res = await listTodo();
            setTodos(res);
        } catch (err) {
            console.error('Error fetching todos:', err);
            router.push('/auth/login');
        }
    }, [router]);
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingTodo) {
                await updateTodo(editingTodo._id, {
                    title,
                    description,
                    completed: editingTodo.completed,
                });
                setEditingTodo(null);
            } else {
                await postTodo({ title, description });
            }
            setTitle('');
            setDescription('');
            fetchTodos();
        } catch (err) {
            console.error('Error saving todo:', err);
        }
    };
    const handleEdit = (todo: ITodo) => {
        setEditingTodo(todo);
        setTitle(todo.title);
        setDescription(todo.description);
    };
    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Are you sure you want to delete this todo?');
        if (!confirm) return;
        try {
            await deleteTodo(id);
            fetchTodos();
        } catch (err) {
            console.error('Error deleting todo:', err);
        }
    };
    const handleToggleComplete = async (todo: ITodo) => {
        try {
            await updateTodo(todo._id, {
                ...todo,
                completed: !todo.completed,
            });
            fetchTodos();
        } catch (err) {
            console.error('Error toggling completion:', err);
        }
    };
    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
                My Todos
            </h1>
            <TodoForm
                title={title}
                description={description}
                onTitleChange={setTitle}
                onDescriptionChange={setDescription}
                onSubmit={handleSubmit}
                editing={!!editingTodo}
            />
            <TodoList
                todos={todos}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
            />
        </main>
    );
}

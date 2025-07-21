'use client';
import React, { useState, useEffect } from 'react';
import { postTodo } from '../lib/todo/postTodo';
import { updateTodo } from '../lib/todo/updateTodo';
import { ITodo } from '../lib/todo/types';

type Props = {
    editingTodo: ITodo | null;
    onSuccess: () => void;
};

export default function TodoForm({ editingTodo, onSuccess }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [formErrors, setFormErrors] = useState<{ title?: string; description?: string }>({});

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTodo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors: typeof formErrors = {};
        if (!title.trim()) errors.title = 'Title is required';
        if (!description.trim()) errors.description = 'Description is required';
        if (Object.keys(errors).length) return setFormErrors(errors);

        try {
            if (editingTodo) {
                await updateTodo(editingTodo._id, { title, description, completed: editingTodo.completed });
            } else {
                await postTodo({ title, description });
            }
            onSuccess();
            setTitle('');
            setDescription('');
            setFormErrors({});
        } catch (err) {
            console.error('Error saving todo:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Title"
                className={`w-full px-4 py-2 border rounded dark:bg-gray-900 dark:text-white ${
                    formErrors?.title ? 'border-red-500' : ''
                }`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {formErrors?.title && <p className="text-red-500 text-sm">{formErrors.title}</p>}

            <textarea
                placeholder="Description"
                className={`w-full px-4 py-2 border rounded dark:bg-gray-900 dark:text-white ${
                    formErrors?.description ? 'border-red-500' : ''
                }`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {formErrors?.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
                {editingTodo ? 'Update Todo' : 'Add Todo'}
            </button>
        </form>
    );
}

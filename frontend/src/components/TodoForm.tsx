'use client';
import React from 'react';

type Props = {
    title: string;
    description: string;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    editing: boolean;
};

export default function TodoForm({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    onSubmit,
    editing,
}: Props) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 border rounded  dark:bg-gray-900 dark:text-white"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                className="w-full px-4 py-2 border rounded dark:bg-gray-900 dark:text-white"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
                {editing ? 'Update Todo' : 'Add Todo'}
            </button>
        </form>
    );
}
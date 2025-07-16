'use client';
import React from 'react';

type Props = {
    title: string;
    description: string;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    editing: boolean;
    formErrors?: {
        title?: string;
        description?: string;
    };
};

export default function TodoForm({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    onSubmit,
    editing,
    formErrors,
}: Props) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    className={`w-full px-4 py-2 border rounded dark:bg-gray-900 dark:text-white ${
                        formErrors?.title ? 'border-red-500' : ''
                    }`}
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                />
                {formErrors?.title && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
                )}
            </div>

            <div>
                <textarea
                    placeholder="Description"
                    className={`w-full px-4 py-2 border rounded dark:bg-gray-900 dark:text-white ${
                        formErrors?.description ? 'border-red-500' : ''
                    }`}
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                />
                {formErrors?.description && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
                {editing ? 'Update Todo' : 'Add Todo'}
            </button>
        </form>
    );
}

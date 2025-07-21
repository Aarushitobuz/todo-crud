'use client';
import React from 'react';
import { ITodo } from '../lib/todo/types';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { updateTodo } from '../lib/todo/updateTodo';
import { deleteTodo } from '../lib/todo/deleteTodo';

type Props = {
    todo: ITodo;
    onEdit: (todo: ITodo) => void;
    onAction: () => void;
};

export default function TodoItem({ todo, onEdit, onAction }: Props) {
    const handleToggleComplete = async () => {
        try {
            await updateTodo(todo._id, { ...todo, completed: !todo.completed });
            onAction();
        } catch (err) {
            console.error('Error toggling complete:', err);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
        if (!confirmDelete) return;
        try {
            await deleteTodo(todo._id);
            onAction();
        } catch (err) {
            console.error('Error deleting todo:', err);
        }
    };

    return (
        <li className="flex justify-between items-center p-4 border rounded-md shadow-sm bg-white dark:bg-gray-800">
            <div className="flex items-start gap-4">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggleComplete}
                    className="mt-1 accent-blue-600"
                />
                <div>
                    <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                        {todo.title}
                    </h3>
                    <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        {todo.description}
                    </p>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <button onClick={() => onEdit(todo)} className="text-blue-500 hover:text-blue-700" title="Edit">
                    <FiEdit size={18} />
                </button>
                <button onClick={handleDelete} className="text-red-500 hover:text-red-700" title="Delete">
                    <FiTrash2 size={18} />
                </button>
            </div>
        </li>
    );
}

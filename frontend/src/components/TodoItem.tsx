'use client';
import React from 'react';
import { ITodo } from '../lib/todo/types';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

type TodoItemProps = {
    todo: ITodo;
    onEdit: (todo: ITodo) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (todo: ITodo) => void;
};

export default function TodoItem({
    todo,
    onEdit,
    onDelete,
    onToggleComplete,
}: TodoItemProps) {
    return (
        <li className="flex justify-between items-center p-4 border rounded-md shadow-sm  hover:shadow-md  bg-white dark:bg-gray-800 transition-all">
            <div className="flex items-start gap-4">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleComplete(todo)}
                    className="mt-1 accent-blue-600"
                />
                <div>
                    <h3
                        className={`text-lg font-medium ${
                            todo.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
                        }`}
                    >
                        {todo.title}
                    </h3>
                    <p
                        className={`text-sm ${
                            todo.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'
                        }`}
                    >
                        {todo.description}
                    </p>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <button
                    onClick={() => onEdit(todo)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                >
                    <FiEdit size={18} />
                </button>
                <button
                    onClick={() => onDelete(todo._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                >
                    <FiTrash2 size={18} />
                </button>
            </div>
        </li>
    );
}
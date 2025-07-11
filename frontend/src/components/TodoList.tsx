'use client';
import React from 'react';
import TodoItem from './TodoItem';
import { ITodo } from '../lib/todo/types';

type TodoListProps = {
    todos: ITodo[];
    onEdit: (todo: ITodo) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (todo: ITodo) => void;
};

export default function TodoList({
    todos,
    onEdit,
    onDelete,
    onToggleComplete,
}: TodoListProps) {
    if (!todos.length) {
        return <p className="text-center text-gray-500 mt-6">No todos yet.</p>;
    }
    return (
        <ul className="space-y-4 mt-6">
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                />
            ))}
        </ul>
    );
}
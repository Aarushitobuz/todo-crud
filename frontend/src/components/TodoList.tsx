'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import TodoItem from './TodoItem';
import { ITodo } from '../lib/todo/types';

type Props = {
    todos: ITodo[];
    onAction: () => void;
};

export default function TodoList({ todos, onAction }: Props) {
    const router = useRouter();

    const handleEdit = (todo: ITodo) => {
        router.push(`/todos/edit/${todo._id}`);
    };

    if (!todos.length) {
        return <p className="text-center text-gray-500 mt-6">No todos yet.</p>;
    }

    return (
        <ul className="space-y-4 mt-6">
            {todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} onEdit={handleEdit} onAction={onAction} />
            ))}
        </ul>
    );
}

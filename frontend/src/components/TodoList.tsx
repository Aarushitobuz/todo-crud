'use client';
import React from 'react';
import TodoItem from './TodoItem';
import { ITodo } from '../lib/todo/types';

type Props = {
    todos: ITodo[];
    onEdit: (todo: ITodo) => void;
    onAction: () => void; 
};

export default function TodoList({ todos, onEdit, onAction }: Props) {
    if (!todos.length) {
        return <p className="text-center text-gray-500 mt-6">No todos yet.</p>;
    }

    return (
        <ul className="space-y-4 mt-6">
            {todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} onEdit={onEdit} onAction={onAction} />
            ))}
        </ul>
    );
}

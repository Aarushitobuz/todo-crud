import api from '../api';
import { ITodo } from './types';

export const updateTodo = async(id: string, updatedFields: Partial<ITodo>): Promise<ITodo> => {
    const response = await api.put<ITodo>(`/todo/todos/${id}`,updatedFields);
    return response.data;
}

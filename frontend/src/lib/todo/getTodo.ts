import api from '../api';
import { ITodo } from './types';

export const getTodo = async (id: string): Promise<ITodo> => {
    const response = await api.get<ITodo>(`/todo/todos/${id}`);
    return response.data;
};

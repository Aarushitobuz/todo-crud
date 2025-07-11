import api from '../api';
import { ITodo } from './types';

export const listTodo = async(): Promise<ITodo[]> => {
    const response = await api.get<ITodo[]>('/todo/all-todos');
    return response.data;
}
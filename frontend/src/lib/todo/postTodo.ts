import api from '../api';
import {ITodo} from './types';

export const postTodo = async( todo: {
    title: string;
    description: string;
}): Promise<ITodo> =>  {
    const response = await api.post<ITodo>('/todo/todos',todo);
    return response.data;
}


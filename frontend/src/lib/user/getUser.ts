import api from '@/lib/api';

export const getUser = async () => {
    const res = await api.get('/user/getuser');
    return res.data;
};

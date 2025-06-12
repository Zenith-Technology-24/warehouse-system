import apiService from '../axios';

export const login = async (payload: { username: string, password: string }) => {
    const { data } = await apiService.post('/auth/login', payload);
    return data;
};

export const session = async () => {
    const { data } = await apiService.get('/auth/session')
    return data;
};

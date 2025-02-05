import apiService from '../axios';

export const login = async (payload: { email: string, password: string }) => {
    const { data } = await apiService.post('/auth/login', payload);
    return data;
};

export const session = async () => {
    const { data } = await apiService.get('/session')
    return data;
};

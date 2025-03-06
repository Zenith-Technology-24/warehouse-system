import { Role } from "../../enums/role";
import apiService from "../axios";

interface fetchUsersProps {
    search: string
    page: number
    limit: number
    status: string
}

interface createUserProps {
    firstname: string
    lastname: string
    password: string
    confirm_password: string
    username: string
    role: Role.ADMIN
}

interface updateUserProps {
    id: number
    firstname: string
    lastname: string
    password: string
    confirm_password: number
    username: string
    role: Role.ADMIN
}

interface updateUserStatusProps {
    id: number | null;
    status: string;
}

export const fetchUsers = async ({ search, page, limit, status }: fetchUsersProps) => {
    const { data } = await apiService.get(`user?page=${page}&limit=${limit}&search=${search}&status=${status}`);
    return data;
};

export const createUser = async (data: createUserProps) => {
    const res = await apiService.post("user", data);
    return res;
};

export const updateUser = async (data: updateUserProps) => {
    const res = await apiService.put(`/user/${data.id}`, data);
    return res;
};


export const updateUserStatus = async ({ id, status }: updateUserStatusProps) => {
    const { data } = await apiService.put(`/user/${id}`, { status });
    return data;
};

export const fetchEndUsers = async () => {
    const { data } = await apiService.get('end-user/end-users');
    return data;
};
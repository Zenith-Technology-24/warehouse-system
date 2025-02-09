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

export const fetchUsers = async ({ search, page, limit, status }: fetchUsersProps) => {
    const { data } = await apiService.get(`user/users?page=${page}&limit=${limit}`, { search, status });
    return data;
};

export const createUser = async (data: createUserProps) => {
    const res = await apiService.post("/users", data);
    return res;
};

export const updateUser = async (data: updateUserProps) => {
    const res = await apiService.post(`/user/update/${data.id}`, data);
    return res;
};
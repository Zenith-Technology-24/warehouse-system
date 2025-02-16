import apiService from "../../axios"

interface userProps {
    id: string
    first_name: string
    last_name: number
    username: string
    current_password?: string
    new_password?: string
    confirm_password?: string
}

export const updateUser = async (props: userProps) => {
    const res = await apiService.put(`/auth/user/update`, {
        firstname: props?.first_name,
        lastname: props?.last_name,
        username: props?.username,
        current_password: props?.current_password,
        password: props?.new_password,
        confirm_password: props?.confirm_password
    });
    return res;
};
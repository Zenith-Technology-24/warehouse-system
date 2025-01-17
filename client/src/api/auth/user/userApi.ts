import apiService from "../../axios"

interface userProps {
    first_name: string
    last_name: number
    email: string
    current_password?: string
    new_password?: string
    confirm_password?: string
}

export const updateUser = async (props: userProps) => {
    const res = await apiService.post('/user/update', {
        firstname: props?.first_name,
        lastname: props?.last_name,
        email: props?.email,
        current_password: props?.current_password,
        new_password: props?.new_password,
        confirm_password: props?.confirm_password
    });
    return res;
};
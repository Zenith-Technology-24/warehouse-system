import apiService from "../axios";

export const fetchNotifications = async ({ userId }: any) => {
    const { data } = await apiService.get(`/notification/${userId}`);
    return data;
};

export const readNotification = async (id: string) => {
    const { data } = await apiService.put(`/notification/${id}`);
    return data;
}

export const deleteNotification = async (id: string) => {
    const { data } = await apiService.delete(`/notification/delete/${id}`);
    return data;
}

export const deleteAllNotification = async (userId: string) => {
    const { data } = await apiService.delete(`/notification/delete-all/${userId}`);
    return data;
}
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const getAllUsers = async (res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: any, res: Response): Promise<void> => {
    try {
        const updatedUser = await userService.updateUser(Number(req.user.id), req.body);
        if (updatedUser) {
            res.status(200).json({ message: "User update successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

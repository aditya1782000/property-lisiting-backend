import User from '../../models/user';
import { AsyncResponseType } from '../../types/async';
import bcrypt from 'bcrypt';

export const register = async (
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    password: string,
    confirmPassword: string,
): Promise<AsyncResponseType> => {
    try {
        const exisitngUser = await User.findOne({ email, role });

        if (exisitngUser) {
            return {
                statusCode: 409,
                success: false,
                message: 'User with this email already exists',
            };
        }

        if (password !== confirmPassword) {
            return {
                statusCode: 400,
                success: false,
                message: 'Password and confirm password do not match',
            };
        }
        const hash = await bcrypt.hash(password, 10);

        await User.create({
            firstName,
            lastName,
            email,
            hash,
            role,
        });

        return {
            statusCode: 200,
            success: true,
            message:
                role === 'Admin'
                    ? 'Admin has been created successfully'
                    : 'User has been create successfully',
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                statusCode: 500,
                success: false,
                message: error.message || 'Something went wrong',
            };
        }

        return {
            statusCode: 500,
            success: false,
            message: 'Something went wrong',
        };
    }
};

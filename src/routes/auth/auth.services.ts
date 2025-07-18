import User from '../../models/user';
import { AsyncResponseType } from '../../types/async';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
const jwtSecret = process.env.JWT_SECRET || JWT_SECRET;

export const adminLogin = async (
    email: string,
    password: string,
): Promise<AsyncResponseType> => {
    try {
        let token: string = '';

        const user = await User.findOne({ email, role: 'Admin' });

        if (!user) {
            return {
                statusCode: 404,
                success: false,
                message: 'Admin has not found',
            };
        }

        const passwordMatch: boolean = await bcrypt.compare(
            password,
            user.hash,
        );

        if (!passwordMatch) {
            return {
                statusCode: 406,
                success: false,
                message: 'Invalid password',
            };
        }

        token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            jwtSecret as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN as string,
            } as jwt.SignOptions,
        );

        return {
            statusCode: 200,
            success: true,
            message: 'Admin Login successfully',
            data: {
                token,
                email: user.email || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                role: user.role || '',
                _id: user._id || '',
            },
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

export const userLogin = async (
    email: string,
    password: string,
): Promise<AsyncResponseType> => {
    try {
        let token: string = '';

        const user = await User.findOne({ email, role: 'User' });

        if (!user) {
            return {
                statusCode: 404,
                success: false,
                message: 'Admin has not found',
            };
        }

        const passwordMatch: boolean = await bcrypt.compare(
            password,
            user.hash,
        );

        if (!passwordMatch) {
            return {
                statusCode: 406,
                success: false,
                message: 'Invalid password',
            };
        }

        token = jwt.sign(
            { id: user._id },
            jwtSecret as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN as string,
            } as jwt.SignOptions,
        );

        return {
            statusCode: 200,
            success: true,
            message: 'User Login successfully',
            data: {
                token,
                email: user.email || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                role: user.role || '',
                _id: user._id || '',
            },
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

import { Request, Response } from 'express';
import { register } from './register.services';

export const registerContollers = async (req: Request, res: Response) => {
    const { firstName, lastName, email, role, password, confirmPassword } =
        req.body;

    const response = await register(
        firstName,
        lastName,
        email,
        role,
        password,
        confirmPassword,
    );

    return res.status(response.statusCode).send({
        ...response,
        statusCode: undefined,
    });
};

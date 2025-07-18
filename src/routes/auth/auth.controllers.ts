import { Request, Response } from 'express';
import { adminLogin, userLogin } from './auth.services';

export const adminLoginControllers = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await adminLogin(email, password);

    return res.status(response.statusCode).send({
        ...response,
        statusCode: undefined,
    });
};

export const userLoginControllers = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await userLogin(email, password);

    return res.status(response.statusCode).send({
        ...response,
        statusCode: undefined,
    });
};

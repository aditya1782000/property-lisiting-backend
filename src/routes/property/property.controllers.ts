import { Response } from 'express';
import { RequestWithUser } from '../../types/jwtPayload';
import {
    createProperty,
    deleteProperty,
    editProperty,
    listAdminProperties,
} from './property.services';
import { ObjectId } from 'mongodb';

export const createPropertyControllers = async (
    req: RequestWithUser,
    res: Response,
) => {
    const admin = req.userId;

    const { title, description, price, location } = req.body;

    const response = await createProperty(
        req,
        title,
        description,
        Number(price),
        location,
        new ObjectId(admin),
    );

    return res.status(response.statusCode).send({
        ...response,
        statusCode: undefined,
    });
};

export const editPropertyControllers = async (
    req: RequestWithUser,
    res: Response,
) => {
    const admin = req.userId;

    const { id } = req.params;

    const { title, description, price, location } = req.body;

    const response = await editProperty(
        id,
        req,
        title,
        description,
        Number(price),
        location,
        new ObjectId(admin),
    );

    return res.status(response.statusCode).send({
        ...response,
        statusCode: undefined,
    });
};

export const DeletePropertyControllers = async (
    req: RequestWithUser,
    res: Response,
) => {
    const admin = req.userId;

    const { id } = req.params;

    const response = await deleteProperty(id, new ObjectId(admin));

    return res.status(response.statusCode).send({
        ...response,
        statusCode: undefined,
    });
};

export const listAdminPropertiesControllers = async (
    req: RequestWithUser,
    res: Response,
) => {
    const admin = req.userId;

    const { skip, limit } = req.query;

    const response = await listAdminProperties(
        Number(skip),
        Number(limit),
        new ObjectId(admin),
    );

    return res.status(response.statusCode).send({
        ...response,
        statusCode: undefined,
    });
};

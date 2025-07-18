import { Request } from 'express';

export interface RequestWithUser extends Request {
    userId?: string;
    email?: string;
    role?: string;
}

export interface JWTPayload {
    id: string;
    email?: string;
    role?: string;
}

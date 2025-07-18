import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ValidationError, validationResult } from 'express-validator';
import { JWTPayload, RequestWithUser } from '../types/jwtPayload';

export const isAdmin = () => {
    return async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            let token = req.headers.authorization;

            if (!token) {
                return res.status(403).json({
                    success: false,
                    message: 'Token is required',
                });
            }

            token = token.replace('Bearer ', '');

            try {
                const decode = jwt.verify(
                    token,
                    process.env.JWT_SECRET as string,
                ) as JWTPayload;

                req.userId = decode.id;
                req.email = decode.email;
                req.role = decode.role;

                if (decode.role === 'User') {
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized access',
                    });
                }

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    const errorMessages = errors
                        .array()
                        .map((error: ValidationError) => error.msg)
                        .join(', ');
                    return res.status(422).json({
                        success: false,
                        message: errorMessages,
                    });
                }

                return next();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    return res.status(401).json({
                        success: false,
                        message: error.message || 'Token is expired or invalid',
                    });
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({
                    success: false,
                    message: error.message || 'Something went wrong',
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
};

import { body } from 'express-validator';

export const adminLoginValidators = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email is invalid'),

    body('password').notEmpty().bail().withMessage('Password is required'),
];

export const userLoginValidators = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email is invalid'),

    body('password').notEmpty().bail().withMessage('Password is required'),
];

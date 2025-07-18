import { body } from 'express-validator';
import enums from '../../../enum';

export const registerValidators = [
    body('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .bail()
        .isString()
        .withMessage('First name must be a string')
        .bail()
        .isLength({ min: 3, max: 25 })
        .withMessage('First name must be between 3 and 25 characters'),

    body('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .bail()
        .isString()
        .withMessage('Last name must be a string')
        .bail()
        .isLength({ min: 3, max: 25 })
        .withMessage('Last name must be between 3 and 25 characters'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email is invalid'),

    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .bail()
        .isIn(enums.role)
        .withMessage('Invalid role'),

    body('password')
        .notEmpty()
        .bail()
        .withMessage('Password is required')
        .bail()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/,
        )
        .withMessage(
            'Your password needs 8+ characters, including an uppercase, lowercase, number, and special character',
        ),

    body('confirmPassword')
        .notEmpty()
        .bail()
        .withMessage('Confirm Password is required')
        .bail()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/,
        )
        .withMessage(
            'Your password needs 8+ characters, including an uppercase, lowercase, number, and special character',
        ),
];

import { body, param, query } from 'express-validator';

export const createPropertyValidators = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .bail()
        .isString()
        .withMessage('Title Must be a string')
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage('Title msut be between 1 to 100 charaters'),

    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .bail()
        .isString()
        .withMessage('Description Must be a string')
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage('Description must be between 1 to 100 charaters'),

    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .bail()
        .isNumeric()
        .withMessage('Description Must be a numberic'),
];

export const editPropertyValidators = [
    param('id')
        .notEmpty()
        .withMessage('id is required')
        .bail()
        .isMongoId()
        .withMessage('Invalid id'),

    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .bail()
        .isString()
        .withMessage('Title Must be a string')
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage('Title msut be between 1 to 100 charaters'),

    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .bail()
        .isString()
        .withMessage('Description Must be a string')
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage('Description must be between 1 to 100 charaters'),

    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .bail()
        .isNumeric()
        .withMessage('Description Must be a numberic'),
];

export const deletePropertyValidators = [
    param('id')
        .notEmpty()
        .withMessage('id is required')
        .bail()
        .isMongoId()
        .withMessage('Invalid id'),
];

export const listAdminPropertiesValidators = [
    query('skip')
        .notEmpty()
        .withMessage('Skip is required')
        .bail()
        .isNumeric()
        .withMessage('Skip must be a numeric'),

    query('limit')
        .notEmpty()
        .withMessage('Limit is required')
        .bail()
        .isNumeric()
        .withMessage('Limit must be a numeric'),
];

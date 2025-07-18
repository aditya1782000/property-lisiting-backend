import express from 'express';
import uploader from '../../utils/uploader';
import { isAdmin } from '../../middleware/isAdmin';
import {
    createPropertyControllers,
    DeletePropertyControllers,
    editPropertyControllers,
    listAdminPropertiesControllers,
} from './property.controllers';
import {
    createPropertyValidators,
    deletePropertyValidators,
    editPropertyValidators,
    listAdminPropertiesValidators,
} from './property.validators';

const router = express.Router();

router.post(
    '/admin/property/create',
    uploader.uploadFile('image'),
    createPropertyValidators,
    isAdmin(),
    createPropertyControllers,
);

router.patch(
    '/admin/property/:id/edit',
    uploader.uploadFile('image'),
    editPropertyValidators,
    isAdmin(),
    editPropertyControllers,
);

router.delete(
    '/admin/property/:id/delete',
    deletePropertyValidators,
    isAdmin(),
    DeletePropertyControllers,
);

router.get(
    '/admin/property/list',
    listAdminPropertiesValidators,
    isAdmin(),
    listAdminPropertiesControllers,
);

export default router;

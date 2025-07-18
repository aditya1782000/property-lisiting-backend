import express from 'express';
import { adminLoginValidators, userLoginValidators } from './auth.validators';
import {
    adminLoginControllers,
    userLoginControllers,
} from './auth.controllers';

const router = express.Router();

router.post('/admin/login', adminLoginValidators, adminLoginControllers);

router.post('/user/login', userLoginValidators, userLoginControllers);

export default router;

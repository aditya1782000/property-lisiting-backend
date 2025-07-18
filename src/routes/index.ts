import express from 'express';
import register from './register/register.routes';
import auth from './auth/auth.routes';
import property from './property/property.routes';

const router = express.Router();

router.use('/', [register, auth, property]);

export default router;

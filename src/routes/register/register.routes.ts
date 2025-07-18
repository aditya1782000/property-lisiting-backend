import express from 'express';
import { registerValidators } from './register.validators';
import { registerContollers } from './register.controllers';

const router = express.Router();

router.post('/register', registerValidators, registerContollers);

export default router;

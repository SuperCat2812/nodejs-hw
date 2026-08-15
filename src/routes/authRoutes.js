import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post('/register', celebrate(registerUserSchema), registerUser);
authRoutes.post('/login', celebrate(loginUserSchema), loginUser);
authRoutes.post('/refresh', refreshUserSession);
authRoutes.post('/logout', logoutUser);

export default authRoutes;

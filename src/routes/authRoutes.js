import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post('/register', celebrate(registerUserSchema), registerUser);
authRoutes.post('/login', celebrate(loginUserSchema), loginUser);
authRoutes.post('/refresh', refreshUserSession);
authRoutes.post('/logout', logoutUser);
authRoutes.post(
  '/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
authRoutes.post(
  '/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default authRoutes;

import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { authController } from './auth.controller';
import authValidations from './auth.validation';
const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authController.loginUserController,
);
router.post('/logout', auth('User', 'Admin'), authController.logOutController);

export const AuthRoutes = router;

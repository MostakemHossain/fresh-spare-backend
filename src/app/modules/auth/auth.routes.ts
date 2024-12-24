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

router.post(
  '/forgot-password',
  validateRequest(authValidations.forgotPasswordValidationSchema),
  authController.forgotPassword,
);
router.post(
  '/verify-forgot-password-otp',
  validateRequest(authValidations.verifyForgotPasswordOTPValidationSchema),
  authController.verifyForgotPasswordOtp,
);
router.post(
  '/reset-password',
  validateRequest(authValidations.resetPasswordValidationSchema),
  authController.resetPassword,
);
router.post('/refresh-token', authController.refreshToken);

export const AuthRoutes = router;

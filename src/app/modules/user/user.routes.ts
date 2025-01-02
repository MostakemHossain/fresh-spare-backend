import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { fileUploader } from '../../shared/fileUpload';
import userControllers from './user.controller';
import userValidations from './user.validation';
const router = express.Router();

router.post(
  '/registration',
  validateRequest(userValidations.createUserValidationSchema),
  userControllers.userRegistration,
);
router.post(
  '/verify-email',
  validateRequest(userValidations.verifyEmail),
  userControllers.verifyEmail,
);
router.put(
  '/update-avatar',
  auth('User', 'Admin'),
  fileUploader.upload.single('file'),
  userControllers.updateAvatar,
);
router.put(
  '/update-user',
  auth('User', 'Admin'),
  validateRequest(userValidations.updateUserValidationSchema),
  userControllers.updateUserDetails,
);
router.get('/me', auth('User', 'Admin'), userControllers.getMe);
router.post(
  '/change-password',
  auth('User', 'Admin'),
  userControllers.changePassword,
);
const userRoutes = router;
export default userRoutes;

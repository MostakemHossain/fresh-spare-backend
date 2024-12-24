import express from 'express';
import validateRequest from '../../middleware/validateRequest';
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

const userRoutes = router;
export default userRoutes;

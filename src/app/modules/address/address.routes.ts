import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import AddressController from './address.controllers';
import AddressValidation from './address.validations';
const router = express.Router();

router.post(
  '/add-address',
  validateRequest(AddressValidation.createAddressValidationSchema),
  auth('User'),
  AddressController.addAddress,
);

router.get('/get-address', auth('User'), AddressController.getAddress);
router.put(
  '/update-address/:id',
  auth('User'),
  AddressController.updateAddress,
);
router.delete(
  '/delete-address/:id',
  auth('User'),
  AddressController.deleteAddress,
);
const AddressRoutes = router;
export default AddressRoutes;

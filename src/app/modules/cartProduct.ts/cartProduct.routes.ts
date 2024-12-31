import express from 'express';
import auth from '../../middleware/auth';
import CartController from './cartProduct.controller';
const router = express.Router();

router.post('/add-to-cart', auth('User'), CartController.addToCart);
router.get('/get-cart-item', auth('User'), CartController.getCartItem);
router.put('/update-cart-item', auth('User'), CartController.updateCartItemQty);
router.delete(
  '/delete-cart-item',
  auth('User'),
  CartController.deleteCartItemQty,
);
const CartRoutes = router;
export default CartRoutes;

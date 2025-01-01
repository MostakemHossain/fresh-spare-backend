import express from 'express';
import auth from '../../middleware/auth';
import OrderController from './order.controller';
const router = express.Router();

router.post(
  '/cash-on-delivery',
  auth('User'),
  OrderController.cashOnOrderPayment,
);

router.post('/checkout', auth('User'), OrderController.payments);
router.get('/get-my-order', auth('User'), OrderController.getMyOrders);

const OrderRoutes = router;

export default OrderRoutes;

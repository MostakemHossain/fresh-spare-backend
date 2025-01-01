import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import stripeClient from '../../stripe/stripe';
import { pricewithDiscount } from '../../utils/PriceWithDiscount';
import CartProduct from '../cartProduct.ts/cartProduct.model';
import UserModel from '../user/user.model';
import OrderModel from './order.model';

const cashOnOrderPayment = async (req: any) => {
  const userId = req.user.id;
  const { list_items, totalAmount, address_id, subTotalAmount } = req.body;
  const payload = list_items.map((el: any) => {
    return {
      userId: userId,
      orderId: `ORD-${new mongoose.Types.ObjectId()}`,
      productId: el.productId._id,
      product_details: {
        name: el.productId.name,
        image: el.productId.image,
      },
      paymentId: '',
      payment_status: 'CASH ON DELIVERY',
      delivery_address: address_id,
      subTotalAmount: totalAmount,
      totalAmount: subTotalAmount,
    };
  });
  const generatedOrder = await OrderModel.insertMany(payload);

  const removeCartItems = await CartProduct.deleteMany({ userId: userId });
  const updateInUser = await UserModel.updateOne(
    { _id: userId },
    { $set: { shopping_cart: [] } },
  );
  return generatedOrder;
};

const payments = async (req: any) => {
  const userId = req.user.id;
  const { list_items, totalAmount, address_id, subTotalAmount } = req.body;

  const user = await UserModel.findById(userId);
  console.log(Math.round(totalAmount));
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const payload = list_items.map((el: any) => {
    return {
      userId: userId,
      orderId: `ORD-${new mongoose.Types.ObjectId()}`,
      productId: el.productId._id,
      product_details: {
        name: el.productId.name,
        image: el.productId.image,
      },
      paymentId: '',
      payment_status: 'ONLINE PAYMENT',
      delivery_address: address_id,
      subTotalAmount: totalAmount,
      totalAmount: subTotalAmount,
    };
  });

  const line_items = list_items.map((item: any) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.productId.name,
          images: item.productId.image,
          metadata: {
            productId: item.productId._id,
          },
        },
        unit_amount:
          pricewithDiscount(
            Math.round(item.productId.price),
            Math.round(item.productId.discount),
          ) * 100,
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
      quantity: item.quantity,
    };
  });
  const generatedOrder = await OrderModel.insertMany(payload);

  const removeCartItems = await CartProduct.deleteMany({ userId: userId });
  const updateInUser = await UserModel.updateOne(
    { _id: userId },
    { $set: { shopping_cart: [] } },
  );

  const params = {
    submit_type: 'pay',
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: user.email,
    metadata: {
      userId: userId,
      addressId: address_id,
    },
    line_items: line_items,
    success_url: `${config.FRONTEND_URL}/success`,
    cancel_url: `${config.FRONTEND_URL}/cancel`,
  };
  //@ts-ignore
  const session = await stripeClient.checkout.sessions.create(params);
  return session;
};

const getMyOrderDetails = async (req: any) => {
  const userId = req.user.id;
  const orderList = await OrderModel.find({
    userId: userId,
  }).sort({
    createdAt: -1,
  });
  return orderList;
};

const getAllOrdersDetails = async () => {
  const orderList = await OrderModel.find({}).sort({
    createdAt: -1,
  });
  return orderList;
};

const OrderServices = {
  cashOnOrderPayment,
  payments,
  getMyOrderDetails,
  getAllOrdersDetails,
};
export default OrderServices;

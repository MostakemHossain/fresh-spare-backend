import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import CartProduct from './cartProduct.model';

const addToCart = async (req: any) => {
  const userId = req.user.id;
  const { data } = req.body;
  if (!data) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product Id is Required');
  }
  // check product already exists
  const existingProduct = await CartProduct.findOne({
    userId,
    productId: data,
  });
  if (existingProduct) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Product already exists in cart',
    );
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cartItem = await CartProduct.create(
      [
        {
          productId: data,
          userId: userId,
          quantity: 1,
        },
      ],
      { session },
    );
    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: data,
        },
      },
      { session },
    );
    await session.commitTransaction();
    session.endSession();

    return cartItem;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
  }
};

const getCartItem = async (req: any) => {
  const userId = req.user.id;
  const cartItem = await CartProduct.find({
    userId: userId,
  }).populate('productId');
  return cartItem;
};

const updateCartItemQty = async (req: any) => {
  const userId = req.user.id;
  const { id, quantity } = req.body;
  console.log(id);
  console.log(quantity);
  if (!quantity || !id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Id or Qty is required');
  }
  const cartItem = await CartProduct.updateOne(
    {
      userId: userId,
      _id: id,
    },
    {
      quantity: quantity,
    },
  );
  return cartItem;
};

const deleteACartItem = async (req: any) => {
  const userId = req.user.id;
  const { data } = req.body;

  const cartItem = await CartProduct.deleteOne({
    userId: userId,
    _id: data,
  });
  return cartItem;
};
const CartServices = {
  addToCart,
  getCartItem,
  updateCartItemQty,
  deleteACartItem,
};
export default CartServices;

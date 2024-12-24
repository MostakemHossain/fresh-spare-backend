import mongoose, { model, Schema } from 'mongoose';
import { TCartProduct } from './cartProduct.interface';

const cartProductSchema = new Schema<TCartProduct>(
  {
    productId: {
      type: Schema.ObjectId,
      ref: 'product',
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
const CartProduct = model<TCartProduct>(
  'cartProduct',
  cartProductSchema,
);
export default CartProduct;

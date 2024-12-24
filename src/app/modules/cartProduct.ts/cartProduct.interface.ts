import { Types } from 'mongoose';

export type TCartProduct = {
  productId: Types.ObjectId;
  quantity: number;
  userId: Types.ObjectId;
};

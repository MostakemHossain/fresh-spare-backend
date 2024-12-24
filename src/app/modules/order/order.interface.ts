import { Types } from 'mongoose';

export type TOrder = {
  userId: Types.ObjectId;
  orderId: string;
  product_details: {
    name: string;
    image: string[];
  };
  productId: Types.ObjectId;
  paymentId: string;
  payment_status: string;
  delivery_address: Types.ObjectId;
  subTotalAmount: number;
  totalAmount: number;
  invoice_receipt: string;
};

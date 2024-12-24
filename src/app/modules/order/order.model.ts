import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    orderId: {
      type: String,
      required: [true, 'Please provide OrderId'],
      unique: true,
    },
    product_details: {
      name: String,
      image: Array,
    },
    productId: {
      type: Schema.ObjectId,
      ref: 'product',
    },
    paymentId: {
      type: String,
      default: '',
    },
    payment_status: {
      type: String,
      default: '',
    },
    delivery_address:{
        type: Schema.ObjectId,
        ref: 'address'
    },
    subTotalAmount:{
        type: Number,
        default: 0
    },
    totalAmount:{
        type: Number,
        default: 0,
    },
    invoice_receipt:{
        type: String,
        default: ''
    }

  },
  {
    timestamps: true,
  },
);

const OrderModel = model<TOrder>('order', orderSchema);
export default OrderModel;

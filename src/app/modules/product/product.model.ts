import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
    },
    image: {
      type: [String],
      default: [],
    },
    category: [
      {
        type: Schema.ObjectId,
        ref: 'category',
      },
    ],
    subCategory: [
      {
        type: Schema.ObjectId,
        ref: 'subCategory',
      },
    ],
    unit: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: '',
    },
    more_details: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
const ProductModel = model<TProduct>('product', productSchema);
export default  ProductModel;

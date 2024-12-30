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

// create a text index
productSchema.index(
  {
    name: 'text',
    description: 'text',
  },
  {
    weights: {
      name: 10,
      description: 5,
    },
    name: 'ProductTextIndex', 
  },
);
const ProductModel = model<TProduct>('product', productSchema);
export default ProductModel;

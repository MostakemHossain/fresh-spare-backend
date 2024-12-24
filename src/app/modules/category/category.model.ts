import { model, Schema } from 'mongoose';
import { TCategory } from './category.types';

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);
const CategoryModel = model('category', categorySchema);
export default CategoryModel;

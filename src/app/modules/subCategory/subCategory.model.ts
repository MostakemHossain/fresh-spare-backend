import { model, Schema } from 'mongoose';
import { TSubCategory } from './subCategory.interface';

const subCategorySchema = new Schema<TSubCategory>(
  {
    name: { type: String, default: '' },
    image: { type: String, default: '' },
    category:[
        {
            type: Schema.ObjectId,
            ref: 'category'
        }
    ]
  },
  {
    timestamps: true,
  },
);
const SubCategoryModel = model<TSubCategory>('subCategory', subCategorySchema);
export default SubCategoryModel;

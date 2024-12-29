import httpStatus from 'http-status';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/fileUpload';
import SubCategoryModel from './subCategory.model';

const createSubCategory = async (req: any) => {
  const file = req.file;
  if (file) {
    const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
    if (uploadedProfileImage && uploadedProfileImage.secure_url) {
      req.body.image = uploadedProfileImage.secure_url;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Profile image upload failed!',
      );
    }
  }
  let categories: Types.ObjectId[] = [];
  if (req.body.categories) {
    try {
      const categoryArray = JSON.parse(req.body.categories);

      if (Array.isArray(categoryArray)) {
        categories = categoryArray.map((id: string) => {
          if (!Types.ObjectId.isValid(id)) {
            throw new Error(`Invalid ObjectId: ${id}`);
          }
          return new Types.ObjectId(id);
        });
      } else {
        throw new Error('Categories is not a valid array!');
      }
    } catch (error) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid categories format!');
    }
  }

  const data = {
    image: req.body.image,
    name: req.body.data,
    category: categories,
  };
  const result = await SubCategoryModel.create(data);
  return result;
};

const SubCategoryServices = {
  createSubCategory,
};
export default SubCategoryServices;

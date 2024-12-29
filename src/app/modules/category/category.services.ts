import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/fileUpload';
import CategoryModel from './category.model';

const addCategory = async (req: any) => {
  const isCategoryAlreadyExists = await CategoryModel.findOne({
    name: req.body.data,
  });
  if (isCategoryAlreadyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category already exists');
  }

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
  const data = {
    image: req?.body?.image,
    name: req?.body?.data,
  };
  const result = await CategoryModel.create(data);
  return result;
};

const getAllCategory = async () => {
  const result = await CategoryModel.find({});
  return result;
};
const CategoryServices = {
  addCategory,
  getAllCategory,
};
export default CategoryServices;

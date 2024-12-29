import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/fileUpload';
import ProductModel from '../product/product.model';
import SubCategoryModel from '../subCategory/subCategory.model';
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

const updateCategory = async (req: any) => {
  const { id } = req.params;
  const file = req.file;
  let imageUrl: string | undefined;
  if (file) {
    const uploadedImage = await fileUploader.uploadToCloudinary(file);
    if (uploadedImage && uploadedImage.secure_url) {
      imageUrl = uploadedImage.secure_url;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Category image upload failed!',
      );
    }
  }

  const updateData: { name?: string; image?: string } = {};
  if (req.body?.data) {
    updateData.name = req.body.data;
  }
  if (imageUrl) {
    updateData.image = imageUrl;
  }

  const updatedCategory = await CategoryModel.findByIdAndUpdate(id, updateData);
  return updatedCategory;
};

const getAllCategory = async () => {
  const result = await CategoryModel.find({});
  return result;
};

const deleteCategory = async (id: string) => {
  const checkSubCategory = await SubCategoryModel.find({
    category: {
      $in: [id],
    },
  }).countDocuments();
  const checkProductModel = await ProductModel.find({
    category: {
      $in: [id],
    },
  }).countDocuments();
  if (checkSubCategory > 0 || checkProductModel > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category is already used');
  }
  const result = await CategoryModel.findByIdAndDelete(id);
  return result;
};
const CategoryServices = {
  addCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
};
export default CategoryServices;

import httpStatus from 'http-status';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/fileUpload';
import SubCategoryModel from './subCategory.model';

const createSubCategory = async (req: any) => {
  const isSubCategoryAlreadyExists = await SubCategoryModel.findOne({
    name: req.body.name,
  });
  if (isSubCategoryAlreadyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Sub Category already exists');
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

const deleteSubCategory = async (id: string) => {
  const subCategory = await SubCategoryModel.findByIdAndDelete(id);
  return subCategory;
};

const getAllSubCategory = async () => {
  const result = await SubCategoryModel.find().populate('category').sort({
    createdAt: -1,
  });
  return result;
};

const updateSubCategory = async (req: any) => {
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

  let categories: string[] = [];

  if (req.body.categories) {
    try {
      const categoryArray = JSON.parse(req.body.categories);

      if (Array.isArray(categoryArray)) {
        categories = categoryArray.map((id: string) => {
          if (!Types.ObjectId.isValid(id)) {
            throw new Error(`Invalid ObjectId: ${id}`);
          }
          return new Types.ObjectId(id).toString();
        });
      } else {
        throw new Error('Categories is not a valid array!');
      }
    } catch (error) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid categories format!');
    }
  }

  const updateData: { name?: string; image?: string; categories?: string[] } =
    {};

  if (req.body?.data) {
    updateData.name = req.body.data;
  }

  if (imageUrl) {
    updateData.image = imageUrl;
  }

  if (req.body.categories) {
    updateData.categories = categories;
  }

  const result = await SubCategoryModel.findByIdAndUpdate(id, updateData);
  return result;
};

const SubCategoryServices = {
  createSubCategory,
  getAllSubCategory,
  deleteSubCategory,
  updateSubCategory,
};
export default SubCategoryServices;

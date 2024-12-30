import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/fileUpload';
import { TProduct } from './product.interface';
import ProductModel from './product.model';

const uploadImage = async (req: any) => {
  let imageUrl: string | undefined;
  const file = req.file;
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
  return imageUrl;
};

const createProduct = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const ProductService = {
  uploadImage,
  createProduct,
};
export default ProductService;

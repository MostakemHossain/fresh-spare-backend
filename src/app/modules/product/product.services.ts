import AppError from '../../errors/AppError';
import QueryBuilder from '../../query/QueryBuilder';
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

const getAllProduct = async (req: any) => {
  const query = req.query;
  const queryBuilder = new QueryBuilder(ProductModel.find({}), query);

  queryBuilder
    .search(['name', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await queryBuilder.modelQuery.exec();

  const total = await queryBuilder.countTotal();

  return {
    data: result,
    total,
  };
};

const getProductByCategory = async (id: string) => {
  const result = await ProductModel.find({
    category: { $in: id },
  }).limit(20);
  return result;
};

const getGetProductByCategoryAndSubCategory = async (payload: any) => {
  const query = {
    category: { $in: payload.category },
    subCategory: { $in: payload.subCategory },
  };
  let page=1;
  let limit=20;
  if(payload.page){ 
    page=payload.page;
  }
  if(payload.limit){
    limit=payload.limit;
  }

  const skip = (page - 1) * limit;

  const [data, dataCount] = await Promise.all([
    ProductModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(payload.limit),
    ProductModel.countDocuments(query),
  ]);

  return { data, dataCount, page, limit };
};
const ProductService = {
  uploadImage,
  createProduct,
  getAllProduct,
  getProductByCategory,
  getGetProductByCategoryAndSubCategory,
};
export default ProductService;

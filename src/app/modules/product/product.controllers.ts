import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import ProductService from './product.services';

const uploadImage = catchAsync(async (req, res) => {
  const result = await ProductService.uploadImage(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Image updated successfully',
    data: result,
  });
});

const createProduct = catchAsync(async (req, res) => {
  console.log('hello');
  const result = await ProductService.createProduct(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product Created successfully',
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProduct(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getProductByCategory = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const result = await ProductService.getProductByCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Product By Category retrieved successfully',
    data: result,
  });
});

const getGetProductByCategoryAndSubCategory = catchAsync(async (req, res) => {
  const result = await ProductService.getGetProductByCategoryAndSubCategory(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Product By Category & SubCategory retrieved successfully',
    data: result,
  });
});

const getProductDetails = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const result = await ProductService.getProductDetails(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Product details retrieved successfully',
    data: result,
  });
});

const ProductController = {
  uploadImage,
  getAllProduct,
  createProduct,
  getProductByCategory,
  getGetProductByCategoryAndSubCategory,
  getProductDetails,
};
export default ProductController;

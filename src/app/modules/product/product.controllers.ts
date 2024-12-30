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
const ProductController = {
  uploadImage,
  createProduct,
};
export default ProductController;

import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import CategoryServices from './category.services';

const addCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.addCategory(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category added successfully',
    data: result,
  });
});
const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategory();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All category retrieved successfully',
    data: result,
  });
});
const CategoryController = {
  addCategory,
  getAllCategory,
};
export default CategoryController;

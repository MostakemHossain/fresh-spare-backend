import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import SubCategoryServices from './subCategory.services';

const createSubCategory = catchAsync(async (req, res) => {
  const result = await SubCategoryServices.createSubCategory(req);
  sendResponse(res, {
    success: true,
    message: 'Sub Category Created Successfully',
    data: result,
    statusCode: httpStatus.CREATED,
  });
});

const getAllSubCategory = catchAsync(async (req, res) => {
  const result = await SubCategoryServices.getAllSubCategory();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Sub Category retrieved successfully',
    data: result,
  });
});
const SubCategoryController = {
  createSubCategory,
  getAllSubCategory,
};
export default SubCategoryController;

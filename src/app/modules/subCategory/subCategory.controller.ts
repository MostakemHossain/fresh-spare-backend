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
const deleteSubCategory = catchAsync(async (req, res) => {
  const result = await SubCategoryServices.deleteSubCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category deleted successfully',
    data: result,
  });
});
const updateSubCategory = catchAsync(async (req, res) => {
  const result = await SubCategoryServices.updateSubCategory(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category updated successfully',
    data: result,
  });
});
const SubCategoryController = {
  createSubCategory,
  getAllSubCategory,
  deleteSubCategory,
  updateSubCategory,
};
export default SubCategoryController;

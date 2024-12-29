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
const SubCategoryController = {
  createSubCategory,
};
export default SubCategoryController;

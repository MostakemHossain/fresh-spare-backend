import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import userServices from './user.service';

const userRegistration = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.userRegistration(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Create a user registration successfully',
    data: result,
  });
});
const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { code } = req.body;
  const result = await userServices.verifyEmail(code);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User verified successfully',
    data: result,
  });
});

const updateAvatar = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    console.log(req);
    const result = await userServices.updateAvatar(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Avatar updated successfully',
      data: result,
    });
  },
);

const updateUserDetails = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await userServices.updateUserDetails(req.body, req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Information updated successfully',
      data: result,
    });
  },
);

const getMe = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await userServices.getMe(req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My Information retrieved successfully',
      data: result,
    });
  },
);

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    console.log(req);
    const result = await userServices.changePassword(req.user.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password change successfully',
      data: result,
    });
  },
);

const userControllers = {
  userRegistration,
  verifyEmail,
  updateAvatar,
  updateUserDetails,
  getMe,
  changePassword
};
export default userControllers;

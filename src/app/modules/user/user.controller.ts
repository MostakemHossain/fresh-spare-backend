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

const userControllers = {
  userRegistration,
  verifyEmail,
};
export default userControllers;
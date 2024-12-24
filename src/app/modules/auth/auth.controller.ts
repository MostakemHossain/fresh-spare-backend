import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import authServices from './auth.service';
import httpStatus from 'http-status';

const loginUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body);
  const { accessToken, refreshToken, ...remainingData } = result;
  res.cookie('accessToken', accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });
  res.cookie('refreshToken', refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  });
});

export const authController = {
  loginUserController,
};

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import authServices from './auth.service';

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

const logOutController = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await authServices.logoutUser(req.user);
    res.clearCookie('accessToken', {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    });
    res.clearCookie('refreshToken', {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logout successfully',
      data: null,
    });
  },
);

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await authServices.forgotPassword(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Check your Email',
    data: null,
  });
});

const verifyForgotPasswordOtp = catchAsync(
  async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const result = await authServices.verifyForgotPasswordOtp({ email, otp });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OTP verification successfully',
      data: result,
    });
  },
);

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.resetPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: null,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken =
    req.cookies.refreshToken || req?.headers?.authorization?.split(' ')[1];
  const result = await authServices.refreshToken(refreshToken);
  res.cookie('accessToken', result, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token generate using refresh token',
    data: result,
  });
});

export const authController = {
  loginUserController,
  logOutController,
  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,
  refreshToken,
};

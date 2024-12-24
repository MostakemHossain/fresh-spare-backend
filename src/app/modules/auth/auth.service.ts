import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import sendEmail from '../../config/sendEmail';
import AppError from '../../errors/AppError';
import { jwtHelpers } from '../../helpers/jwthelpers';
import forgotPasswordTemplate from '../../utils/forgotPasswordTemplate';
import generateOTP from '../../utils/generateOTP';
import resetPasswordSuccessTemplate from '../../utils/resetPasswordTemplete';
import { TRESETPASSWORD } from '../user/user.interface';
import UserModel from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;
  const existingUser = await UserModel.findOne({ email, status: 'Active' });
  if (!existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string,
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
    config.jwt__refresh_secret as string,
    config.jwt__refresh_expire_in as string,
  );
  await UserModel.updateOne(
    { _id: existingUser._id },
    { refresh_token: refreshToken },
  );
  return {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    accessToken,
    refreshToken,
  };
};

const logoutUser = async (user: any) => {
  const removeToken = await UserModel.findByIdAndUpdate(user.id, {
    refresh_token: '',
  });
  return removeToken;
};

const forgotPassword = async (email: string) => {
  //existing user
  console.log(email);
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const otp = generateOTP();
  // expire in 15 min
  const otpExpiry = new Date(Date.now() + 15 * 60 * 100);

  const update = await UserModel.findByIdAndUpdate(user._id, {
    forgot_password_otp: otp,
    forgot_password_expires: new Date(otpExpiry).toISOString(),
  });

  await sendEmail({
    sendTo: email,
    subject: 'Forgot password from FreshSpare',
    html: forgotPasswordTemplate({ name: user.name, otp }),
  });
  return update;
};

const verifyForgotPasswordOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const currentTime = new Date();
  if (currentTime > user.forgot_password_expires) {
    throw new AppError(httpStatus.BAD_REQUEST, 'OTP expired');
  }
  if (user.forgot_password_otp !== otp) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP');
  }
  return null;
};

const resetPassword = async (payload: TRESETPASSWORD) => {
  const { email, newPassword, confirmPassword } = payload;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }
  if (newPassword !== confirmPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Passwords do not match');
  }
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  const update = await UserModel.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });

  await sendEmail({
    sendTo: email,
    subject: 'Your password has been successfully reset',
    html: resetPasswordSuccessTemplate({ name: user.name }),
  });
  return update;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Unauthorized access');
  }

  const refreshToken = jwtHelpers.verifyToken(
    token,
    config.jwt__refresh_secret as string,
  );
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Unauthorized access');
  }

  const existingUser = await UserModel.findOne({
    email: refreshToken.email,
    status: 'Active',
  });
  if (!existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const accessToken = jwtHelpers.generateToken(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string,
  );
  return accessToken;
};

const authServices = {
  loginUser,
  logoutUser,
  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,
  refreshToken,
};
export default authServices;

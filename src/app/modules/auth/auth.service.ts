import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { jwtHelpers } from '../../helpers/jwthelpers';
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

const authServices = {
  loginUser,
  logoutUser,
};
export default authServices;

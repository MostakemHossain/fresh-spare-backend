import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import sendEmail from '../../config/sendEmail';
import AppError from '../../errors/AppError';
import { jwtHelpers } from '../../helpers/jwthelpers';
import { fileUploader } from '../../shared/fileUpload';
import verifyEmailTemplate from '../../utils/verifyEmail.templete';
import { TChangePassword, TUSER } from './user.interface';
import UserModel from './user.model';
const userRegistration = async (payload: TUSER) => {
  const { email, password, name } = payload;
  const isUserAlreadyExists = await UserModel.findOne({ email });
  if (isUserAlreadyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  const user = new UserModel({ email, password: hashedPassword, name });
  const result = await user.save();
  const verifyEmailUrl = `${config.frontend_url}/verify-email?code=${result?._id}`;

  const verifyEmail = await sendEmail({
    sendTo: email,
    subject: 'Verify Email from FreshSpare',
    html: verifyEmailTemplate({
      name,
      url: verifyEmailUrl,
    }),
  });
  return result;
};

const verifyEmail = async (code: string) => {
  const user = await UserModel.findOne({ _id: code });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const updateUser = await UserModel.updateOne(
    { _id: code },
    {
      verify_email: true,
    },
  );
  return updateUser;
};

const updateAvatar = async (req: any) => {
  console.log('hello');
  const file = req.file;
  console.log(req.file);
  if (file) {
    const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
    if (uploadedProfileImage && uploadedProfileImage.secure_url) {
      req.body.avatar = uploadedProfileImage.secure_url;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Profile image upload failed!',
      );
    }
  }
  const result = await UserModel.findByIdAndUpdate(req.user.id, {
    avatar: req.body.avatar,
  });
  return result;
};

const updateUserDetails = async (payload: Partial<TUSER>, userId: string) => {
  const { name, mobile, password } = payload;
  let hashedPassword = '';
  if (password) {
    hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  const result = await UserModel.updateOne(
    { _id: userId },
    {
      ...(name && { name: name }),
      ...(mobile && { mobile: mobile }),
      ...(password && { password: hashedPassword }),
    },
  );
  return result;
};

const getMe = async (user: string) => {
  const result = await UserModel.findById(user).populate('address_details');
  return result;
};

const changePassword = async (user: string, payload: TChangePassword) => {
  const isUserExists = await UserModel.findOne({
    _id: user,
  });
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Uses does not exists');
  }
  console.log(isUserExists);
  // compare passsword
  const isPasswordMatch = await bcrypt.compare(
    payload.currentPassword,
    isUserExists.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password does not match');
  }

  // hashed password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  // update user password
  const updateUser = await UserModel.findByIdAndUpdate(user, {
    password: hashedPassword,
  });

  const accessToken = jwtHelpers.generateToken(
    {
      id: isUserExists.id,
      email: isUserExists.email,
      role: isUserExists.role,
      name: isUserExists.name,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string,
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      id: isUserExists.id,
      email: isUserExists.email,
      role: isUserExists.role,
      name: isUserExists.name,
    },
    config.jwt__refresh_secret as string,
    config.jwt__refresh_expire_in as string,
  );
  await UserModel.updateOne(
    { _id: isUserExists._id },
    { refresh_token: refreshToken },
  );
  console.log(accessToken);
  return {
    id: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    accessToken,
    refreshToken,
  };
};

const GoogleUserRegistration = async (req: any) => {
  let userInfo = await UserModel.findOne({ email: req.body.email });
  if (!userInfo) {
    userInfo = await UserModel.create({
      name: req?.body?.displayName,
      avatar: req?.body?.photoURL,
      email: req?.body?.email,
      password: 'user12345',
      mobile: req?.body?.providerData?.phoneNumber,
    });
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
      name: userInfo.name,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string,
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      id: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
      name: userInfo.name,
    },
    config.jwt__refresh_secret as string,
    config.jwt__refresh_expire_in as string,
  );
  await UserModel.updateOne(
    { _id: userInfo._id },
    { refresh_token: refreshToken },
  );
  return {
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    accessToken,
    refreshToken,
  };
};

const userServices = {
  userRegistration,
  verifyEmail,
  updateAvatar,
  updateUserDetails,
  getMe,
  changePassword,
  GoogleUserRegistration,
};
export default userServices;

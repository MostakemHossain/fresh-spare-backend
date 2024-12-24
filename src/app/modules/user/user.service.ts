import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import sendEmail from '../../config/sendEmail';
import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/fileUpload';
import forgotPasswordTemplate from '../../utils/forgotPasswordTemplate';
import generateOTP from '../../utils/generateOTP';
import verifyEmailTemplate from '../../utils/verifyEmail.templete';
import { TRESETPASSWORD, TUSER } from './user.interface';
import UserModel from './user.model';
import resetPasswordSuccessTemplate from '../../utils/resetPasswordTemplete';
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
  const file = req.file;
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

const userServices = {
  userRegistration,
  verifyEmail,
  updateAvatar,
  updateUserDetails,
  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,
};
export default userServices;

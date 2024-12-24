import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import sendEmail from '../../config/sendEmail';
import AppError from '../../errors/AppError';
import verifyEmailTemplate from '../../utils/verifyEmail.templete';
import { TUSER } from './user.interface';
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
const userServices = {
  userRegistration,
  verifyEmail,
};
export default userServices;

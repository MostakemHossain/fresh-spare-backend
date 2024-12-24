import bcrypt from 'bcrypt';
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
const userServices={
    userRegistration
}
export default userServices;
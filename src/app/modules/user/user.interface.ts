import { Types } from 'mongoose';

export type TUSER = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  mobile: string;
  refresh_token: string;
  verify_email: boolean;
  last_login_date: Date;
  status: 'Active' | 'Inactive' | 'Suspended';
  role: 'Admin' | 'User' | 'Super_Admin';
  address_details: Types.ObjectId;
  shopping_cart: Types.ObjectId;
  orderHistory: Types.ObjectId;
  forgot_password_otp: string;
  forgot_password_expires: Date;
};

export type TRESETPASSWORD = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

import { model, Schema } from 'mongoose';
import { TUSER } from './user.interface';

const UserSchema = new Schema<TUSER>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    avatar: { type: String, default: '' },
    mobile: { type: String, default: '' },
    refresh_token: { type: String, default: '' },
    verify_email: { type: Boolean, default: false },
    last_login_date: { type: Date, default: null },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Suspended'],
      default: 'Active',
    },
    role: {
      type: String,
      enum: ['Admin', 'User', 'Super_Admin'],
      default: 'User',
    },
    address_details: { type: Schema.Types.ObjectId, ref: 'address' },
    shopping_cart: [{ type: Schema.Types.ObjectId, ref: 'cartProduct' }],
    orderHistory: { type: Schema.Types.ObjectId, ref: 'order' },
    forgot_password_otp: { type: String, default: null },
    forgot_password_expires: { type: Date },
  },
  {
    timestamps: true,
  },
);

const UserModel = model<TUSER>('User', UserSchema);

export default UserModel;

import { Types } from 'mongoose';

export type TAddress = {
  address_line: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  mobile: string;
  status: Boolean;
  userId: Types.ObjectId;
};

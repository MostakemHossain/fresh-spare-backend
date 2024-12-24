import { Types } from 'mongoose';

export type TSubCategory = {
  name: string;
  image: string;
  category: Types.ObjectId[];
};

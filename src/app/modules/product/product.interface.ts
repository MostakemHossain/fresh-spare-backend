import { Types } from 'mongoose';

export type TProduct = {
  name: string;
  image: string[];
  category: Types.ObjectId[];
  subCategory: Types.ObjectId[];
  unit: string;
  stock: number | null;
  price: number | null;
  discount: number | null;
  description: string;
  more_details: Record<string, any>;
  publish: boolean;
};

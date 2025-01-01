import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import { TAddress } from './address.interface';
import AddressModel from './address.model';

import mongoose from 'mongoose';

const addAddress = async (userId: string, payload: TAddress) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const data = {
    ...payload,
    userId: userId,
  };
  try {
    const result = await AddressModel.create([data], { session });

    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { address_details: result[0]._id } },
      { session },
    );

    await session.commitTransaction();
    console.log('Transaction committed successfully');
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Transaction aborted due to error:',
    );
  } finally {
    session.endSession();
  }
};

const getAddress = async (userId: string) => {
  const result = await AddressModel.find({
    userId: userId,
  });
  return result;
};

const updateAddress = async (id: string, payload: any, userId: string) => {
  const ifAddressExistsAndValidUsers = await AddressModel.findOne({
    _id: id,
    userId: userId,
  });
  if (!ifAddressExistsAndValidUsers) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Address and user not same or not found',
    );
  }
  const result = await AddressModel.findByIdAndUpdate(id, payload, {});
  return result;
};

const deleteAddress = async (id: string, userId: string) => {
  console.log(id);
  const ifAddressExistsAndValidUsers = await AddressModel.findOne({
    _id: id,
    userId: userId,
  });
  if (!ifAddressExistsAndValidUsers) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Address and user not same or not found',
    );
  }
  const result = await AddressModel.findOneAndDelete({
    _id: id,
  });
  return result;
};

const AddressService = {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
export default AddressService;

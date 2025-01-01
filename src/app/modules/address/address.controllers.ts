import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import AddressService from './address.services';

const addAddress = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await AddressService.addAddress(req.user.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Create Address successfully',
      data: result,
    });
  },
);

const getAddress = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await AddressService.getAddress(req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get address successfully',
      data: result,
    });
  },
);

const updateAddress = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await AddressService.updateAddress(
      req.params.id,
      req.body,
      req.user.id,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'update Address successfully',
      data: result,
    });
  },
);

const deleteAddress = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await AddressService.deleteAddress(
      req.params.id,
      req.user.id,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Address deleted successfully',
      data: result,
    });
  },
);
const AddressController = {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
export default AddressController;

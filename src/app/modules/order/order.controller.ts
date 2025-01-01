import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import OrderServices from './order.services';

const cashOnOrderPayment = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await OrderServices.cashOnOrderPayment(req);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Cash on Order payment successfully',
      data: result,
    });
  },
);

const payments = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await OrderServices.payments(req);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Payment successfully',
      data: result,
    });
  },
);

const getMyOrders = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await OrderServices.getMyOrderDetails(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My orders retrieved successfully',
      data: result,
    });
  },
);
const OrderController = {
  cashOnOrderPayment,
  payments,
  getMyOrders,
};
export default OrderController;

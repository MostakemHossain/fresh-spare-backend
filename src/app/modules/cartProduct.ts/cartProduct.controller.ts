import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import CartServices from './cartProduct.services';

const addToCart = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await CartServices.addToCart(req);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Category added successfully',
      data: result,
    });
  },
);

const getCartItem = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await CartServices.getCartItem(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cart Item retrieved successfully',
      data: result,
    });
  },
);

const updateCartItemQty = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await CartServices.updateCartItemQty(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cart Item updated successfully',
      data: result,
    });
  },
);

const deleteCartItemQty = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await CartServices.deleteACartItem(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cart Item Deleted successfully',
      data: result,
    });
  },
);
const CartController = {
  addToCart,
  getCartItem,
  updateCartItemQty,
  deleteCartItemQty,
};

export default CartController;

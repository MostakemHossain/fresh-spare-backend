import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import CartRoutes from '../modules/cartProduct.ts/cartProduct.routes';
import CategoryRoutes from '../modules/category/category.routes';
import ProductRoutes from '../modules/product/product.routes';
import SubCategoryRoutes from '../modules/subCategory/subCategory.routes';
import userRoutes from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/sub-category',
    route: SubCategoryRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

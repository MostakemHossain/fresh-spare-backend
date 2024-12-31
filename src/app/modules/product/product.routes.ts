import express from 'express';
import { fileUploader } from '../../shared/fileUpload';
import ProductController from './product.controllers';
const router = express.Router();
router.post(
  '/upload',
  fileUploader.upload.single('file'),
  ProductController.uploadImage,
);

router.post(
  '/create-product',
  // auth('Admin'),
  ProductController.createProduct,
);
router.get('/all', ProductController.getAllProduct);
router.get(
  '/get-product-by-category/:id',
  ProductController.getProductByCategory,
);

router.post(
  '/get-product-by-category-and-sub-category',
  ProductController.getGetProductByCategoryAndSubCategory,
);

router.get('/get-product-details/:id', ProductController.getProductDetails);
router.put(
  '/update-product/:id',
  // auth('Admin'),
  ProductController.updateProduct,
);
router.delete('/delete-product/:id', ProductController.deleteProduct);
const ProductRoutes = router;
export default ProductRoutes;

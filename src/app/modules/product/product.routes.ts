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
const ProductRoutes = router;
export default ProductRoutes;

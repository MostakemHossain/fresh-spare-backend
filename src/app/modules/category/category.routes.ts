import express from 'express';
import { fileUploader } from '../../shared/fileUpload';
import CategoryController from './category.controller';
const router = express.Router();

router.post(
  '/create-category',
  //   auth('Admin'),
  fileUploader.upload.single('file'),
  CategoryController.addCategory,
);

router.get(
  '/all',
  //   auth('Admin'),
  CategoryController.getAllCategory,
);

const CategoryRoutes = router;
export default CategoryRoutes;

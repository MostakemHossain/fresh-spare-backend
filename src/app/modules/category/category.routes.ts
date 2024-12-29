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

const CategoryRoutes = router;
export default CategoryRoutes;

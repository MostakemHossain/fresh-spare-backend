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
router.put(
  '/update/:id',
  //   auth('Admin'),
  fileUploader.upload.single('file'),
  CategoryController.updateCategory,
);

router.get(
  '/all',
  //   auth('Admin'),
  CategoryController.getAllCategory,
);
router.delete(
  '/:id',
  //   auth('Admin'),
  CategoryController.deleteCategory,
);

const CategoryRoutes = router;
export default CategoryRoutes;

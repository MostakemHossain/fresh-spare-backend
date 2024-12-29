import express from 'express';
import { fileUploader } from '../../shared/fileUpload';
import SubCategoryController from './subCategory.controller';
const router = express.Router();

router.post(
  '/create-sub-category',
  fileUploader.upload.single('file'),
  SubCategoryController.createSubCategory,
);
router.get('/all', SubCategoryController.getAllSubCategory);

const SubCategoryRoutes = router;
export default SubCategoryRoutes;

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
router.delete('/:id', SubCategoryController.deleteSubCategory);
router.put('/update/:id',fileUploader.upload.single('file'), SubCategoryController.updateSubCategory);

const SubCategoryRoutes = router;
export default SubCategoryRoutes;

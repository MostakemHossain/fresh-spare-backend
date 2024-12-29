import express from 'express';
import SubCategoryController from './subCategory.controller';
import { fileUploader } from '../../shared/fileUpload';
const router = express.Router();

router.post('/create-sub-category',
    fileUploader.upload.single('file')  
    ,SubCategoryController.createSubCategory);

const SubCategoryRoutes = router;
export default SubCategoryRoutes;

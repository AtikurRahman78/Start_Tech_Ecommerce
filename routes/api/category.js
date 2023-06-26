const express = require('express');
const { createcategoryController, categoryStatus, createSubCategoryController, subCategoryStatusController, getAllCategoryController, getAllSubCategoryController } = require('../../controllers/categoryControllers/categoryControllers');
const router = express.Router();

// Create Category Route
router.post('/createcategory', createcategoryController);

// Category Status Route
router.post('/categorystatus', categoryStatus);

// Create Sub Category Route 
router.post('/createsubcategory', createSubCategoryController);

// Sub Category Status Route
router.post('/subcategorystatus', subCategoryStatusController);


// Get All Category Data
router.get('/allcategory', getAllCategoryController);

// Get All Sub Category Data
router.get('/allsubcategory', getAllSubCategoryController);



module.exports = router;
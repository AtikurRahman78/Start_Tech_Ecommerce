const express = require('express');
const { createVariantController, secureUpload, createProductController } = require('../../controllers/productControllers/productController');
const router = express.Router();

// Create Product Part
router.post('/createproduct', secureUpload, createProductController);

// Create Variant Part
router.post('/createvariant', createVariantController);


module.exports = router;
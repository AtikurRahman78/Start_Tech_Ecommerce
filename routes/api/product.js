const express = require('express');
const { createVariantController, secureUpload, createProductController } = require('../../controllers/productControllers/productController');
const router = express.Router();
const multer = require('multer')

// Image Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.originalname.split('.')[1]}`);
        // console.log(file.originalname.split('.')[1]);
    }
})

const upload = multer({ storage: storage })


// Create Product Part
router.post('/createproduct', secureUpload, createProductController);

// Create Variant Part
router.post('/createvariant', upload.single('image'), createVariantController);


module.exports = router;
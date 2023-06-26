const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.js');
const categoryRoutes = require('./category.js');
const productRoutes = require('./product.js');

// All Auth Routes
router.use('/auth', authRoutes);

// All Category Routes
router.use('/category', categoryRoutes);

// All Product Routes
router.use('/product', productRoutes);

module.exports = router;
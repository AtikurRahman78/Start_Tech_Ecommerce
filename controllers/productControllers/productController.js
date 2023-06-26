const Product = require("../../model/productModel");
const User = require("../../model/userModel");
const Variant = require("../../model/variantModel");


// ==================== Product Secure Part Start ==================

async function secureUpload(req, res, next) {

    const userId = req.headers.authorization.split('@')[1];
    const password = req.headers.authorization.split('@')[2];

    if (!req.headers.authorization) {
        return res.json({ error: 'Unauthorized!' });
    }

    const user = await User.find({ _id: userId });

    if (user.length > 0) {
        if (password == process.env.MERCHANT_SECRET_KEY) {
            if (user[0].role == 'merchant') {
                next();
            }
        } else {
            return res.json({ error: 'You are not able to create product!!' })
        }
    } else {
        return res.json({ error: 'You are not able to create product!' });
    }


}

// ==================== Product Secure Part End ==================

// ==================== Create Product Part Start ==================

async function createProductController(req, res) {

    const { name, description, image, store } = req.body;

    if (!name) {
        return res.json({ error: 'Name is required!' });
    } else if (!description) {
        return res.json({ error: 'Description is required!' });
    } else if (!image) {
        return res.json({ error: 'Image is required!' });
    } else if (!store) {
        return res.json({ error: 'Store is required!' });
    } else {

        const product = new Product({

            name,
            description,
            image,
            store

        });

        product.save();

        res.json({ success: 'Product created successfully!' });
    }


}

// ==================== Create Product Part End ==================

// ==================== Creatae Variant Part Start ==================

async function createVariantController(req, res) {

    const { name, image, product } = req.body;

    if (!name) {
        return res.json({ error: 'Name is required!' });
    } else if (!image) {
        return res.json({ error: 'Image is required!' });
    } else if (!product) {
        return res.json({ error: 'Product is required!' });
    } else {

        const variant = new Variant({

            name,
            image,
            product

        });

        variant.save();

        await Product.findOneAndUpdate({ _id: variant.product }, { $push: { variant: variant._id } }, { new: true });

        res.json({ success: 'Variant created successfully!' });

    }


}

// ==================== Creatae Variant Part End ==================

module.exports = { secureUpload, createProductController, createVariantController };
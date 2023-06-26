const Category = require("../../model/categoryModel.js");
const Subcategory = require("../../model/subCategoryModel.js");


// ============ Create Category Part Start ==============

async function createcategoryController(req, res) {

    const { name, description } = req.body;

    if (!name) {
        return res.json({ error: 'Name is required!' });
    } else if (!description) {
        return res.json({ error: 'Description is required!' });
    } else {

        const isExistCategory = await Category.find({ name });

        if (isExistCategory.length > 0) {
            return res.json({ error: 'Category already exists!' });
        }

        const category = new Category({

            name,
            description

        });

        category.save();

        res.json({ success: 'Category created successfully!' });
    }
}

// ============ Create Category Part End ==============

// ============ Category Status Part Start ==============

async function categoryStatus(req, res) {

    const { name, status } = req.body;

    if (!name) {
        return res.json({ error: 'Name is required!' });
    } else if (!status) {
        return res.json({ error: 'Status is required!' });
    } else {

        if (status == 'pending' || status == 'rejected') {
            await Category.findOneAndUpdate({ name }, { $set: { isActive: false, status } }, { new: true });
        } else if (status == 'approved') {
            await Category.findOneAndUpdate({ name }, { $set: { isActive: true, status } }, { new: true });
        }

        res.json({ success: 'Category status updated successfully!' })
    }
}

// ============ Category Status Part End ==============

// ============ Create Sub Category Part Start ==============

async function createSubCategoryController(req, res) {

    const { name, description, categoryId } = req.body;

    if (!name) {
        return res.json({ error: 'Name is required!' });
    } else if (!description) {
        return res.json({ error: 'Description is required!' });
    } else if (!categoryId) {
        return res.json({ error: 'Description is required!' });
    } else {

        const isExistSubCategory = await Subcategory.find({ name });

        if (isExistSubCategory.length > 0) {
            return res.json({ error: 'Subcategory already exists!' });
        }

        const subcategory = new Subcategory({

            name,
            description,
            categoryId

        });

        subcategory.save();

        await Category.findOneAndUpdate({ _id: subcategory.categoryId }, { $push: { subCategoryId: subcategory._id } }, { new: true });

        res.json({ success: 'Subcategory created successfully!' });
    }
}

// ============ Create Sub Category Part End ==============

// ============ Sub Category Status Part Start ==============

async function subCategoryStatusController(req, res) {

    const { name, status } = req.body;

    if (!name) {
        return res.json({ error: 'Name is required!' });
    } else if (!status) {
        return res.json({ error: 'Status is required!' });
    } else {

        if (status == 'pending' || status == 'rejected') {
            await Subcategory.findOneAndUpdate({ name }, { $set: { isActive: false, status } }, { new: true });
        } else if (status == 'approved') {
            await Subcategory.findOneAndUpdate({ name }, { $set: { isActive: true, status } }, { new: true });
        }

        res.json({ success: 'Subcategory status updated successfully!' });
    }
}

// ============ Sub Category Status Part End ==============

// ============ Get All Category Data Part Start ==============

async function getAllCategoryController(req, res) {

    const data = await Category.find({}).populate('subCategoryId');

    res.json(data);

}

// ============ Get All Category Data Part End ==============

// ============ Get Sub Category Data Part Start ==============

async function getAllSubCategoryController(req, res) {

    const data = await Subcategory.find({}).populate('categoryId');

    res.json(data);

}

// ============ Get Sub Category Data Part End ==============


module.exports = { createcategoryController, categoryStatus, createSubCategoryController, subCategoryStatusController, getAllCategoryController, getAllSubCategoryController };
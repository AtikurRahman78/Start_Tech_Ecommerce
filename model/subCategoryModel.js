const mongoose = require('mongoose');
const { Schema } = mongoose;

const subCategorySchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'rejected', 'approved'],
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    updated: {
        type: Date,
    },
    created: {
        type: Date,
        default: Date.now,
    }

});


module.exports = mongoose.model('Subcategory', subCategorySchema);
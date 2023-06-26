const mongoose = require('mongoose');
const { Schema } = mongoose;


const storeSchema = new Schema({

    storename: {
        type: String,
        required: true,
    },
    officialemail: {
        type: String,
        required: true,
    },
    officialphone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'rejected', 'approved'],
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    updated: {
        type: Date,
    },
    created: {
        type: Date,
        default: Date.now,
    }

});



module.exports = mongoose.model('Store', storeSchema);
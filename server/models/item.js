const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: String,
    price: Number, 
    stock: Number,
    tags: [], 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
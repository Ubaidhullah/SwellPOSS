import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    photo: {type: String, required: true},
    itemCode: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const itemModel = mongoose.model('Item', ItemSchema);

export default itemModel;
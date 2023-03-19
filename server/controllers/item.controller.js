import Item from "../mongodb/models/item.js";  
import User from "../mongodb/models/user.js";

import * as dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import mongoose from "mongoose";


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const getAllItems = async (req, res) => {
try {
    const items = await Item.find({}).limit(req.query._end);

    res.status(200).json(items);
} catch (error) {
    res.status(500).json({ message: error.message });
}

};
const getItemDetail = async (req, res) => {};
const createItem = async (req, res) => {
    try {
        const {
            title,
            description,
            ItemCode,
            price,
            photo,
            email,
        } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");

        const photoUrl = await cloudinary.uploader.upload(photo);

        const newItem = await Item.create({
            title,
            description,
            ItemCode,
            price,
            photo: photoUrl.url,
            creator: user._id,
        });

        user.allItems.push(newItem._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Property created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateItem = async (req, res) => {};
const deleteItem = async (req, res) => {};

export { getAllItems, getItemDetail, createItem, updateItem, deleteItem };


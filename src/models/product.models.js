import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // },
    category: {
        type: String,
        required: true,
        enum: ["electronics", "clothing", "books", "toys", "appliances"]
    },
    stock: {
        type: Number,
        required: true
    }    
},{timestamps: true});

export const Product = mongoose.model("Product", productSchema);
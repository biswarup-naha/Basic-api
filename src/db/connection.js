import mongoose from "mongoose";

export const connectDb = () => {
    mongoose.connect(process.env.ATLAS_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
}

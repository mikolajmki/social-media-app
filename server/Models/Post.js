import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    desc: String,
    likes: [],
    image: String,

}, { timestamps: true});

export default mongoose.model('Post', postSchema);
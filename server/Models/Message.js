import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId },
    senderId: { type: mongoose.Schema.Types.ObjectId },
    text: { type: String }
}, {
    timestamps: true
});

export default mongoose.model('Message', messageSchema);
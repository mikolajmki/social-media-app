import Message from "../Models/Message.js";
import mongoose from "mongoose";

export const addMessage = async (req, res) => {
    const message = new Message({
        chatId: mongoose.Types.ObjectId(req.body.chatId),
        senderId: mongoose.Types.ObjectId(req.body.senderId),
        text: req.body.text
    });
    try {
        const result = await message.save();
        res.status(200).json({ message: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

export const getMessages = async (req, res) => {
    const chatId = mongoose.Types.ObjectId(req.params.chatId);
    try {
        const messages = await Message.find({ chatId: chatId });
        res.status(200).json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}
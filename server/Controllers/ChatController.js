import Chat from '../Models/Chat.js';
import mongoose, { mongo } from 'mongoose';

export const createChat = async (req, res) => {
    try {
        const chats = await Chat.findOne({ members: { $all: [mongoose.Types.ObjectId(req.body.senderId), mongoose.Types.ObjectId(req.body.receiverId)] } });
         if (chats) {
            return res.status(500).json({ error: "Chat with this user already exist!" });
         }
    } catch (err) {
        console.log(err);
    }
    const newChat = new Chat({
        members: [mongoose.Types.ObjectId(req.body.senderId), mongoose.Types.ObjectId(req.body.receiverId)]
    });

    try {
        const result = await newChat.save();
        res.status(200).json({ message: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

export const userChats = async (req, res) => {    
    try {
        const chat = await Chat.find({ members: { $in: [mongoose.Types.ObjectId(req.params.userId)] } });
        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

export const findChat = async (req, res) => {
    try {
        const chat = await Chat.find({ members: { $all: [mongoose.Types.ObjectId(req.params.firstId), mongoose.Types.ObjectId(req.params.secondId)] } });
        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

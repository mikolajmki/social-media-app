import express from 'express';
import { createChat, userChats, findChat } from '../Controllers/ChatController.js';

const router = express.Router();

router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/:firstId/:secondId', findChat);

export default router;
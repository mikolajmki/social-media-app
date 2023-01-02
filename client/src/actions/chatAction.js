import * as ChatApi from '../api/chatRequest.js';
import * as MessageApi from '../api/messageRequest.js';

export const getUserChats = (userId) => async (dispatch) => {
    dispatch({ type: "GET_CHATS_START" });
    try {
        const { data } = await ChatApi.getUserChats(userId);
        console.log(data)
        dispatch({ type: "GET_CHATS_SUCCESS", data: data })
    } catch (err) {
        console.log(err);
        dispatch({ type: "GET_CHATS_FAIL" });
    }
};

export const getUserMessages = (chatId) => async (dispatch) => {
    dispatch({ type: "GET_MESSAGES_START" });
    try {
        const { data } = await MessageApi.getUserMessages(chatId);
        dispatch({ type: "GET_MESSAGES_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "GET_MESSAGES_FAIL" });
    }
};

export const sendMessage = (message) => async (dispatch) => {
    dispatch({ type: "SEND_MESSAGE_START" });
    try {
        const { data } = await MessageApi.sendMessage(message);
        dispatch({ type: "SEND_MESSAGE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "SEND_MESSAGE_FAIL" });
    }
};

export const receiveSocketMessage = (message) => async (dispatch) => {
    dispatch({ type: "SOCKET_MESSAGE", data: message });
}
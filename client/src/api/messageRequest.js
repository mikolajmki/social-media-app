import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getUserMessages = (chatId) => API.get(`/message/${chatId}`);
export const sendMessage = (data) => API.post('/message', data);
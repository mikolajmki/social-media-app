import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:8000' });

export const getUserChats = (userId) => API.get(`/chat/${userId}`);
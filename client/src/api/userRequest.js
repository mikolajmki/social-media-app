import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        console.log(JSON.parse(localStorage.getItem('profile')).token);
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        console.log(req.headers.authorization);
    }

    return req;
})

export const getUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id, data) => API.put(`/user/${id}`, data);
export const getAllUsers = () => API.get('/user');
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:5000/api",
    withCredentials: true,
})

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('token')) {
//       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
//     }
// })

/* ---------------------------------- auth ---------------------------------- */
export const signup = (formData) => API.post(`/auth/signup`, formData);
export const verify = (formData) => API.post(`/auth/verify`, formData);
export const login = (formData) => API.post(`/auth/login`, formData);

/* -------------------------------- category -------------------------------- */
export const getAllCategories = () => API.get(`/categories`);
export const getCategoryTopics = (categoryId) => API.get(`/categories/${categoryId}/topics`);
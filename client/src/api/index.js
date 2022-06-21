import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:5000/api",
    withCredentials: true,
})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
      req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
})

/* ---------------------------------- auth ---------------------------------- */
export const signup = (formData) => API.post(`/auth/signup`, formData);
export const verify = (formData) => API.post(`/auth/verify`, formData);
export const login = (formData) => API.post(`/auth/login`, formData);

/* -------------------------------- category -------------------------------- */
export const getAllCategories = () => API.get(`/categories`);
export const getCategory = (categoryId) => API.get(`/categories/${categoryId}`);
export const getCategoryTopics = (categoryId) => API.get(`/categories/${categoryId}/topics`);

/* ---------------------------------- topic --------------------------------- */
export const getTopic = (topicId) => API.get(`/topics/${topicId}`);

/* ---------------------------------- posts --------------------------------- */
export const getPosts = (topicId) => API.get(`/topics/${topicId}/posts`);
export const upvotePost = (postId) => API.post(`/posts/${postId}/upvote`);
export const unUpvotePost = (postId) => API.delete(`/posts/${postId}/upvote`);

export const downvotePost = (postId) => API.post(`/posts/${postId}/downvote`);
export const unDownvotePost = (postId) => API.delete(`/posts/${postId}/downvote`);
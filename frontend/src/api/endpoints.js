import axios from 'axios'
import { SERVER_URL } from "../constants/constants";

const BASE_URL = SERVER_URL;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

// video 2, creating axios intercepter. when user access token timeout in 5 mins and get
// 401 unauthorithed error, it will auto-takes access and refreshes it
api.interceptors.response.use(
    (response) => response,
    async error => {
        const original_request = error.config

        if(error.response?.status === 401 && !original_request._retry) {
            original_request._retry = true

            try {
                await refresh_token();
                return api(original_request);
            } catch (refreshError) {
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export const get_user_profile_data = async (username) => {
    const response = await api.get(`/user_data/${username}/`);
    return response.data;
}

// video 2nd login and register part

const refresh_token = async () => {
    const response = await api.post('/token/refresh/');
    return response.data
}

export const login = async (username, password) => {
    const response = await api.post('/token/', {username, password});
    return response.data
}

export const register = async (username, email, firstName, lastName, password) => {
    const response = await api.post('/register/', {username:username,  email:email, first_name:firstName, last_name:lastName, password:password});
    return response.data
}

export const get_auth = async () => {
    const response = await api.get('/authenticated/');
    return response.data
}

export const toggleFollow = async (username) => {
    const response = await api.post('/toggle_follow/', {username:username});
    return response.data
}

export const get_users_posts = async (username) => {
    const response = await api.get(`/posts/${username}/`);
    return response.data
}

export const toggleLike = async (id) => {
    const response = await api.post('/toggleLike/', {id:id})
    return response.data
}

export const create_post = async (description) => {
    const response = await api.post('/create_post/', {description:description})
    return response.data
}

export const get_posts = async (num) => {
    const response = await api.get(`/get_posts/?page=${num}`)
    return response.data
}

export const search_users = async (search) => {
    const response = await api.get(`/search/?query=${search}`)
    return response.data
}

export const logout = async () => {
    const response = await api.post('/logout/')
    return response.data
}

export const update_user = async (values) => {
    const response = await api.patch('/update_user/', values, { headers: {'Content-Type': 'multipart/form-data'}})
    // last part headers lets us to upload images to backend by that content type
    return response.data
}
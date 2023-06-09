import axios from 'axios';

export const makeRequest = axios.create({
        baseURL: 'http://backend:5000/api',
        withCredentials: true,
})
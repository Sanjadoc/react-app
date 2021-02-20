import axios from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API_URL,
    responseType: "json"
}); 
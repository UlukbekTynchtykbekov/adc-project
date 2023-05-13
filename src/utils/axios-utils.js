import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const onSuccess = (response) => response;

const onError = (error) => {
    return Promise.reject(error);
};

client.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
});

export const request = (options) => {
    return client(options)
        .then(onSuccess)
        .catch(onError);
};
import axios from 'axios';
import { useState } from 'react';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + token,
    // },
});
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export const post = async (path, option = {}) => {
    const response = await httpRequest.post(path, option);
    return response;
};
export default httpRequest;

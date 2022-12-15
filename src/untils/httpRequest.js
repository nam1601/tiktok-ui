import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
    // headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + token,
    // },
});
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export const post = async (path, data, option = {}) => {
    const response = await httpRequest.post(path, data, option);
    return response;
};
export default httpRequest;

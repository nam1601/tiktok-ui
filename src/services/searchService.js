import axios from 'axios';
import * as httpRequest from '~/untils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {}
};

export const suggestAccount = async (page, per_page) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page,
            },
        });
        return res.data;
    } catch (error) {}
};

export const videoContent = async (type = 'for-you', page) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {}
};

export const getVideo = async (id) => {
    try {
        const res = await httpRequest.get(`videos/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getCurrentUser = async (token) => {
    try {
        const res = await httpRequest.get('auth/me', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const login = async (type = 'email', email = 'thongluc2401@gmail.com', password = '123456') => {
    try {
        const res = await httpRequest.post('auth/login', {
            type,
            email,
            password,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getUserListVideos = async (id) => {
    try {
        const res = await httpRequest.get(`users/${id}/videos`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getUser = async (nickname) => {
    try {
        const res = await httpRequest.get(`users/@${nickname}`);
        return res.videos;
    } catch (error) {
        console.log(error);
    }
};

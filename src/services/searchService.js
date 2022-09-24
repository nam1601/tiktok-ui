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

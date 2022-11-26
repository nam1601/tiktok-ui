import axios from 'axios';
export const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY2OTQzNDM5NywiZXhwIjoxNjcyMDI2Mzk3LCJuYmYiOjE2Njk0MzQzOTcsImp0aSI6ImptSXY4Unk5U3BiNXV3YlUiLCJzdWIiOjI0NSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.65ouoCHP_cclafSgU-iYg-z4SwCm4pxuw_gQlJg_59M';
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    },
});
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export default httpRequest;

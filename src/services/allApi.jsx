import axios from 'axios';
import { API_ENDPOINTS, BASE_URL } from './constants';

export const userRegister = async (reqBody) => {
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.USER_AUTH}/regsiter`, reqBody, {
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add blog:', error);
        throw error;
    }
};

export const userOTPVerify = async (reqBody) => {
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.USER_AUTH}/verify`, reqBody, {
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add blog:', error);
        throw error;
    }
};

export const userLogin = async (reqBody) => {
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.USER_AUTH}/login`, reqBody, {
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add blog:', error);
        throw error;
    }
};

export const addAddress = async (reqBody) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.USER_ADDRESS}`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getAddress = async (id) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.USER_ADDRESS}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateAddress = async (reqBody , id) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.patch(`${BASE_URL}${API_ENDPOINTS.USER_ADDRESS}/${id}`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAddress = async (reqBody , id) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.USER_ADDRESS}/${id}`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const addToWishlist = async (reqBody) => {
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.WISHLIST}`,reqBody);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const removeWishlist = async (reqBody) => {
    try {
        const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.WISHLIST}`,reqBody);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getWishlist = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.WISHLIST}/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const addToCart = async (reqBody) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.USER_ADDRESS}`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
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

export const getProfile = async (id) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.PROFILE}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (reqBody, id) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.PROFILE}/${id}`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
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

export const updateAddress = async (reqBody, id) => {
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

export const deleteAddress = async (reqBody, id) => {
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
    const token = localStorage.getItem('userToken');
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.WISHLIST}`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
    });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const removeWishlist = async (reqBody) => {
    const token = localStorage.getItem('userToken');
    try {
        const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.WISHLIST}`, {
             headers: {
                Authorization: `Bearer ${token}`
            },
            data: reqBody
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getWishlist = async (id) => {
    const token = localStorage.getItem('userToken');
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.WISHLIST}/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
    });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const addToCart = async (reqBody) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.CART}/add`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateCart = async (reqBody) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.patch(`${BASE_URL}${API_ENDPOINTS.CART}/update`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deletCart = async (productData) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.CART}/remove`, {
            data: productData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCart = async (id) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.CART}/view-cart/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createCheckout = async (reqBody) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.CHECKOUT}`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCheckout = async (checkoutId) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.CHECKOUT}/${checkoutId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const initiateOrder = async (reqBody) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.ORDER}/create`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const confirmOrder = async (reqBody) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.ORDER}/confirm`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};



export const buyNow = async (reqBody) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.CHECKOUT}/buy-now`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const orderById = async (orderId) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.ORDER}/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const allOrders = async (id) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.ORDER}/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getTextSlider = async () => {
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.TEXT_SLIDER}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const cancelOrder = async (orderId, reqBody) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.ORDER}/cancel/${orderId}`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Cancel order error:', error);
        throw error; // Re-throw to handle in component
    }
};

export const returnOrder = async (orderId, reqBody) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.ORDER}/return/${orderId}`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Return order error:', error);
        throw error; // Re-throw to handle in component
    }
};

export const searchProducts = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                query: query,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
import axios from "axios";
import { API_ENDPOINTS, BASE_URL } from "../../services/constants";


export const addProduct = async (reqBody) => {
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}/create-product`, reqBody, {
            headers: {
                'Content-Type': 'multipart/form-data',           
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

export const addTextSlider = async (reqBody) => {
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.TEXT_SLIDER}`, reqBody, {
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getTextSliders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.TEXT_SLIDER}`, {
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateTextSlider = async (id,reqBody) => {
    try {
        const response = await axios.patch(`${BASE_URL}${API_ENDPOINTS.TEXT_SLIDER}/${id}`, reqBody, {
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deleteTextSlider = async (id,reqBody) => {
    try {
        const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.TEXT_SLIDER}/${id}`, reqBody, {
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
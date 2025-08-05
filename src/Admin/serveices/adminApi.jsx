import axios from "axios";
import { API_ENDPOINTS, BASE_URL } from "../../services/constants";

export const adminLogin = async (credentials) => {
    try {
        const response = await axios.post(
            `${BASE_URL}${API_ENDPOINTS.ADMIN_AUTH}/login`,
            credentials 
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const addProduct = async (reqBody) => {
   const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}/create-product`, reqBody, {
            headers: {
                'Content-Type': 'multipart/form-data',  
                 Authorization: `Bearer ${token}`         
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (id,reqBody) => {
  const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.patch(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}/${id}`, reqBody, {
            headers: {
                'Content-Type': 'multipart/form-data',  
                 Authorization: `Bearer ${token}`             
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (id) => {
   const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`    
            }
        });
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

export const getProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const addTextSlider = async (reqBody) => {
   const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.TEXT_SLIDER}`, reqBody, {
        headers: {
           Authorization: `Bearer ${token}`    
        }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getTextSliders = async () => {
  const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.TEXT_SLIDER}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateTextSlider = async (id,reqBody) => {
  const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.patch(`${BASE_URL}${API_ENDPOINTS.TEXT_SLIDER}/${id}`, reqBody, {
            headers: {
               Authorization: `Bearer ${token}`    
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deleteTextSlider = async (id,reqBody) => {
  const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.TEXT_SLIDER}/${id}`, reqBody, {
            headers: {
               Authorization: `Bearer ${token}`    
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const addCarousal = async (reqBody) => {
  const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.CAROUSEL}/create`, reqBody, {
            headers: {
                'Content-Type': 'multipart/form-data',  
                 Authorization: `Bearer ${token}`             
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error; 
    }
};

export const getCarousels = async () => {
   const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.CAROUSEL}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateCarousal = async (reqBody, id) => {
   const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.patch(`${BASE_URL}${API_ENDPOINTS.CAROUSEL}/${id}`, reqBody, {
            headers: {
                'Content-Type': 'multipart/form-data', 
                 Authorization: `Bearer ${token}`              
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCarousel = async (id) => {
   const token = localStorage.getItem('adminToken');
    try {
        const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.CAROUSEL}/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`    
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async () => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.USERS}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getOrders = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.ORDER}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getInvoices = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.INVOICE}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateOrderStatus = async (reqBody,id) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.patch(`${BASE_URL}${API_ENDPOINTS.ORDER}/update/${id}`, reqBody,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteOrder = async (id) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.ORDER}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}

export const getDashboardCounts = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.DASHBOARD}/view-Counts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getDashboardGraph = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.DASHBOARD}/view-graph`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getRecentOrders = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.DASHBOARD}/view-recent/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const userStatusChange = async (id, reqBody) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.patch(`${BASE_URL}${API_ENDPOINTS.USERS}/${id}`, reqBody,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteUser = async (id, reqBody) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.USERS}/${id}`, reqBody,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteInvoice = async (id) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.INVOICE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}
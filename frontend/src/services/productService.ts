// frontend/src/services/productService.ts
import axios from 'axios';

// The URL of your backend server
const API_URL = 'http://localhost:5000/api/products'; 

// Function to get all products from the backend
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // This will be the list of products
  } catch (error) {
    console.error("Error fetching products:", error);
    // You can add better error handling here, like using the use-toast hook
    throw error;
  }
};

// You can add more functions here, like getProductById, createProduct, etc.
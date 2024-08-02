import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/orders/`

export const getUserHistory = async () => {
  try {
    let result = await axios.get(`${API_BASE_URL}GetOrdById/1`)
    return result.data
  }
  catch (ch) {
    console.log(ch)
  }
}
export const GetOrderByOrderId = async (orderId) => {
  try {
    console.log(`Making request to: ${API_BASE_URL}GetOrderByOrderId/${orderId}`);
    const response = await axios.get(`${API_BASE_URL}GetOrderByOrderId/${orderId}`);
    console.log('Response received:', response);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('No data found');
    }
  } catch (error) {
    console.error('Error fetching order details:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
};

import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 존재 상품 위시 추가 API
export const createWishExistProductAPI = async (wishData) => {

  try {
    const response = await axios.post(
      `${BASE_URL}/wish/existing-product`,
      wishData,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }
};
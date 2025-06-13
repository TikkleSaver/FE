import axios from "axios";
import axiosInstance from "../axiosInstance";

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

// 나의 구매 예정 위시 목록 조회
export const getMyWishPlanned = async () => {
  try {
    const response = await axiosInstance.get(`/wish/mine/planned`);
    return response.data.result;
  } catch (error) {
    console.error("나의 구매 예정 위시 조회 실패:", error);
    throw error;
  }
};
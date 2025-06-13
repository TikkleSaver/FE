import axios from "axios";
import axiosInstance from "../axiosInstance";

// 존재 상품 위시 추가 API
export const createWishExistProduct = async (wishData) => {
  try {
    const response = await axiosInstance.post(`/wish/existing-product`, wishData);
    return response.data;
  } catch (error) {
    console.error("위시 추가(네이버 상품) 실패:", error);
    throw error;
  }
};

// 직접 추가한 상품 위시 추가 API
export const createWishNotExistProduct = async (wishData) => {
  try {
    const response = await axiosInstance.post(`/wish/my-product`, wishData);
    return response.data;
  } catch (error) {
    console.error("위시 추가(내가 직접) 실패:", error);
    throw error;
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

// 나의 구매 완료 위시 목록 조회
export const getMyWishPurchased = async () => {
  try {
    const response = await axiosInstance.get(`/wish/mine/purchased`);
    return response.data.result;
  } catch (error) {
    console.error("나의 구매 완료 위시 조회 실패:", error);
    throw error;
  }
};

// 위시 상세 조회
export const getWishInfo = async (wishId) => {
  try {
    const response = await axiosInstance.get(`/wish/${wishId}`);
    return response.data.result;
  } catch (error) {
    console.error("위시 상세 내용 조회 실패:", error);
    throw error;
  }
};

// 친구의 구매 예정 위시 목록 조회
export const getFriendWishPlanned = async (friendId) => {
  try {
    const response = await axiosInstance.get(`/wish/friend/${friendId}/planned`);
    return response.data.result;
  } catch (error) {
    console.error("친구의 구매 예정 위시 목록 조회 실패:", error);
    throw error;
  }
};

// 친구의 구매 완료 위시 목록 조회
export const getFriendWishPurchased = async (friendId) => {
  try {
    const response = await axiosInstance.get(`/wish/friend/${friendId}/purchased`);
    return response.data.result;
  } catch (error) {
    console.error("친구의 구매 완료 위시 조회 실패:", error);
    throw error;
  }
};


// 참견소 위시 목록 조회
export const getWishList = async () => {
  try {
    const response = await axiosInstance.get(`/wish`);
    return response.data.result;
  } catch (error) {
    console.error("참견소 위시 목록 조회 실패:", error);
    throw error;
  }
};

// 존재 상품 위시 수정 API
export const updateWishExistProduct = async (wishId, wishData) => {
  try {
    const response = await axiosInstance.patch(`/wish/${wishId}/existing-product`, wishData);
    return response.data;
  } catch (error) {
    console.error("위시 수정(네이버 상품) 실패:", error);
    throw error;
  }
};

// 직접 추가한 상품 위시 수정 API
export const updateWishNotExistProduct = async (wishId, wishData) => {
  try {
    const response = await axiosInstance.patch(`/wish/${wishId}/my-product`, wishData);
    return response.data;
  } catch (error) {
    console.error("위시 수정(내가 직접) 실패:", error);
    throw error;
  }
};

// 위시 삭제 API
export const deleteWish = async (wishId) => {
  try {
    const response = await axiosInstance.delete(`/wish/${wishId}`);
    return response.data;
  } catch (error) {
    console.error("위시 삭제 실패:", error);
    throw error;
  }
};
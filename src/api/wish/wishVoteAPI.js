import axiosInstance from "../axiosInstance";

// 위시 찬성/반대 투표 API
export const createWishVote = async (wishId, status) => {
  try {
    const response = await axiosInstance.post(`/wish/${wishId}/vote?status=${status}`);
    return response.data;
  } catch (error) {
    console.error("위시 찬성/반대 투표 실패:", error);
    throw error;
  }
};

// 위시 찬성/반대 투표 조회 API
export const getWishVote = async (wishId) => {
  try {
    const response = await axiosInstance.get(`/wish/${wishId}/vote`);
    return response.data;
  } catch (error) {
    console.error("위시 찬성/반대 투표 조회 실패:", error);
    throw error;
  }
};


// 위시 찬성/반대 투표 취소 API
export const deleteWishVote = async (wishId) => {
  try {
    const response = await axiosInstance.delete(`/wish/${wishId}/vote`);
    return response.data;
  } catch (error) {
    console.error("위시 찬성/반대 투표 취소 실패:", error);
    throw error;
  }
};
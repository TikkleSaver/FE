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
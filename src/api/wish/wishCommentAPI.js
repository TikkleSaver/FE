import axiosInstance from "../axiosInstance";

// 위시 댓글 목록 조회
export const getWishCommentList = async (wishId) => {
  try {
    const response = await axiosInstance.get(`/wish/${wishId}/comment`);
    return response.data.result;
  } catch (error) {
    console.error("위시 댓글 목록 조회 실패:", error);
    throw error;
  }
};
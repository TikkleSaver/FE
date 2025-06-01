import axiosInstance from '../api/axiosInstance';

// 친구 요청 취소
export const deleteFriendReq = async (reqId) => {
  try {
    const response = await axiosInstance.delete(`/friend-requests/${reqId}`);
    return response.result;
  } catch (error) {
    console.error('친구 삭제 실패:', error);
    throw error;
  }
};

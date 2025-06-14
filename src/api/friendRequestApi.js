import axiosInstance from '../api/axiosInstance';

// 친구 요청 취소 & 거절
export const deleteFriendReq = async (reqId) => {
  try {
    const response = await axiosInstance.delete(`/friend-requests/${reqId}`);
    return response.result;
  } catch (error) {
    console.error('친구 삭제 실패:', error);
    throw error;
  }
};

// 친구 요청
export const sendFriendReq = async (receiverId) => {
  try {
    const response = await axiosInstance.post('/friend-requests', {
      receiverId: receiverId,
    });
    return response.data; // 또는 response.result 등 응답 형식에 따라 조정
  } catch (error) {
    console.error('친구 요청 실패:', error);
    throw error;
  }
};

// 친구 요청 목록 가져오기
export const getFriendRequests = async () => {
  try {
    const response = await axiosInstance.get('/friend-requests');
    return response.data.result; // 백엔드 응답 구조에 따라 result 사용
  } catch (error) {
    console.error('친구 요청 목록 불러오기 실패:', error);
    throw error;
  }
};

// 친구 요청 수락
export const acceptFriendReq = async (reqId) => {
  try {
    const response = await axiosInstance.patch(`/friend-requests/${reqId}`);
    return response.data.result; // 응답 구조에 따라 적절히 조정
  } catch (error) {
    console.error('친구 요청 수락 실패:', error);
    throw error;
  }
};

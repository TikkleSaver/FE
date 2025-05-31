import axiosInstance from '../api/axiosInstance';

//친구 목록 조회회
export async function fetchFriendList() {
  try {
    const response = await axiosInstance.get('/friends'); // 실제 엔드포인트에 맞게 조정
    // 성공 시 데이터 구조에 맞게 반환
    return response.data.result.friendList;
  } catch (error) {
    console.error('Failed to fetch friend list:', error);
    throw error;
  }
}

//친구 상세 조회
export const fetchFriendProfile = async (memberId) => {
  try {
    const response = await axiosInstance.get(`/friends/${memberId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch profile for friend ID ${memberId}:`, error);
    throw error;
  }
};

// 친구 삭제
export const deleteFriend = async (friendId) => {
  try {
    const response = await axiosInstance.delete(`/friends/${friendId}`);
    return response.result;
  } catch (error) {
    console.error('친구 삭제 실패:', error);
    throw error;
  }
};

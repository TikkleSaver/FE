import axiosInstance from '../api/axiosInstance';

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

export const fetchFriendProfile = async (friendId) => {
  try {
    const response = await axiosInstance.get(`/friends/${friendId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch profile for friend ID ${friendId}:`, error);
    throw error;
  }
};

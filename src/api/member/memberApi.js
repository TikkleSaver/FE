import axiosInstance from '../axiosInstance';

// 닉네임으로 사용자 검색
export async function searchMembers(keyword, pageNum) {
  try {
    const response = await axiosInstance.get('/users/search', {
      params: {
        keyword: keyword,
        pageNum: pageNum,
      },
    });
    return response.data.result; // 백엔드에서 ApiResponse의 result만 사용
  } catch (error) {
    console.error('Failed to search members:', error);
    throw error;
  }
}

import axiosInstance from '../api/axiosInstance';

/**
 * 사용자 프로필 정보 조회 API
 * @returns {Promise<Object>} API 응답
 */
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data; // MemberProfileDTO 객체가 담겨 있음
  } catch (error) {
    console.error(
      '프로필 정보 조회 실패:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updatePassword = async (password, newPassword) => {
  try {
    const body = {
      password,
      newPassword,
    };

    const response = await axiosInstance.patch('/users/password', body);
    return response.data;
  } catch (error) {
    console.error('비밀번호 변경 실패:', error.response?.data || error.message);
    throw error;
  }
};


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

export const updateProfile = async (nickname, profileImgFile) => {
  const formData = new FormData();
  formData.append(
    'requestDTO',
    new Blob([JSON.stringify({ nickname })], { type: 'application/json' })
  );
  formData.append('profileImg', profileImgFile); // null 또는 undefined일 경우 append하지 않아도 됩니다.

  try {
    const response = await axiosInstance.patch('/users', formData);

    console.log('업데이트 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('업데이트 실패:', error);
    throw error;
  }
};

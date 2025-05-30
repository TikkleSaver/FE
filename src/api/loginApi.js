import axiosInstance from '../api/axiosInstance';

export const login = async (loginId, password) => {
  try {
    const response = await axiosInstance.post('/login', {
      loginId,
      password,
    });

    const { accessToken, refreshToken } = response.data.result;

    // 로컬 스토리지에 저장
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return { success: true, accessToken, refreshToken };
  } catch (error) {
    console.error('로그인 실패:', error);
    return {
      success: false,
      message: error.response?.data?.message || '로그인 중 오류 발생',
    };
  }
};

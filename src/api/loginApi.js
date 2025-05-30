import axiosInstance from '../api/axiosInstance';
import refreshAxios from '../api/refreshAxios';

export const login = async (loginId, password) => {
  try {
    const response = await refreshAxios.post('/login', {
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

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/logout');

    // 로컬스토리지 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    return response.data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};

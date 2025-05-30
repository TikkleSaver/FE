import refreshAxios from './refreshAxios'; // 응답 인터셉터 없는 axios 인스턴스

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('리프레시 토큰이 없습니다.');

    const response = await refreshAxios.post(
      '/refresh-token',
      null, // 바디 없음
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`, // 헤더에 토큰 전송
        },
      }
    );

    const newAccessToken = response.data.result.accessToken;
    const newRefreshToken = response.data.result.refreshToken;

    // 새로운 accessToken 저장
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error('액세스 토큰 갱신 실패:', error);
    throw error;
  }
};

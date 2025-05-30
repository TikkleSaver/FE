import axiosInstance from '../api/axiosInstance';

/**
 * 회원가입 요청 API
 * @param {Object} formValues - 회원가입 입력값
 * @returns {Promise<Object>} API 응답
 */
export const signUp = async (formValues) => {
  try {
    const requestBody = {
      loginId: formValues.email, // input name이 'email'인 경우 loginId에 매핑
      password: formValues.password,
      nickname: formValues.nickname,
    };

    const response = await axiosInstance.post('/signup', requestBody);
    console.error('회원가입 실패:', response.data);

    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

/**
 * 아이디(이메일) 중복 확인 API
 * @param {string} email - 입력된 이메일 주소
 * @returns {Promise<Object>} API 응답
 */
export const checkEmailDuplicate = async (email) => {
  try {
    const response = await axiosInstance.post(`/check-id/${email}`);
    return response.data; // 응답 메시지: "사용가능한 이메일입니다."
  } catch (error) {
    console.error('이메일 중복 확인 실패:', error);
    throw error;
  }
};

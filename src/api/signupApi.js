import refreshAxios from '../api/refreshAxios';

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

    const response = await refreshAxios.post('/signup', requestBody);
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
    const response = await refreshAxios.post(`/check-id/${email}`);
    return response.data; // 응답 메시지: "사용가능한 이메일입니다."
  } catch (error) {
    console.error('이메일 중복 확인 실패:', error);
    throw error;
  }
};

//온보딩
export const saveCategories = async (memberId, categoryList) => {
  try {
    const response = await refreshAxios.post('/users/onboarding/category', {
      memberId,
      categoryList,
    });

    console.log('카테고리 저장 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 저장 실패:', error.response?.data || error.message);
  }
};

export const saveGoalCost = async (memberId, goalCost) => {
  try {
    const response = await refreshAxios.patch('/users/onboarding/goalCost', {
      memberId,
      goalCost,
    });
    console.log(response.data); // "목표 지출액 저장 완료"
    return response.data;
  } catch (error) {
    console.error('API 호출 에러:', error.response?.data || error.message);
    return null;
  }
};

import axiosInstance from "../axiosInstance";

/**
 * 일별 총 지출 금액 리스트 조회 API
 * @param {number} memberId - 사용자 ID
 * @param {number} year - 조회할 연도 (ex. 2025)
 * @param {number} month - 조회할 월 (1~12)
 * @returns {Promise<Object>} API 응답 데이터
 */
export const getDailyTotalExpense = async (memberId, year, month) => {
  try {
    const params = { year, month };
    if (memberId !== null && memberId !== undefined) {
      params.memberId = memberId;
    }

    const response = await axiosInstance.get("/expense/dailyTotalExpense", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("일별 지출 총액 조회 실패:", error);
    throw error;
  }
};

/**
 * 특정 사용자의 지출 목표 금액 조회 API
 */
export const getgoalCost = async (memberId) => {
  try {
    let url = "/users/goalCost";
    if (memberId !== null && memberId !== undefined) {
      url += `?memberId=${memberId}`;
    }

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("사용자의 지출 목표 금액 조회 실패:", error);
    throw error;
  }
};

/**
 * 특정 사용자의 지출 목표 금액 수정 API
 * @param {number} year - 조회할 연도 (ex. 2025)
 */
export const patchGoalCost = async (goalCost) => {
  try {
    const response = await axiosInstance.patch(
      `/users/goalCost?goalCost=${goalCost}`
    );
    return response.data;
  } catch (error) {
    console.error("사용자의 지출 목표 금액 조회 실패:", error);
    throw error;
  }
};

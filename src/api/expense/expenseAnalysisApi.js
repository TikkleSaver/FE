import axiosInstance from "../axiosInstance";

/**
 * 특정 년도의 월별 지출 총 금액 리스트 조회 API
 * @param {Object} year - 조회할 년도도
 * @returns {Promise<Object>} 월별 지출 총 금액액
 */
export const getMonthlyTotalExpense = async (year) => {
  try {
    const response = await axiosInstance.get(
      `/expense/monthlyTotalExpense?year=${year}`
    );
    return response.data.result;
  } catch (error) {
    console.error("지출 조회 실패:", error);
    throw error;
  }
};

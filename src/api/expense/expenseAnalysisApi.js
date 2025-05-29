import axiosInstance from "../axiosInstance";

/**
 * 특정 년도의 월별 지출 총 금액 리스트 조회 API
 * @param {Object} year - 조회할 년도
 * @returns {Promise<Object>} 월별 지출 총 금액
 */
export const getMonthlyTotalExpense = async (year) => {
  try {
    const response = await axiosInstance.get(
      `/expense/monthlyTotalExpense?year=${year}`
    );
    return response.data.result;
  } catch (error) {
    console.error("월별 지출 총 금액 조회 실패:", error);
    throw error;
  }
};

/**
 * 특정 사용자의 특정 달의 카테고리별 지출 금액 리스트 조회 API
 * @param {Object} year - 조회할 년도
 * @param {Object} month - 조회할 월도
 * @returns {Promise<Object>} 월별 지출 총 금액액
 */
export const getTotalExpenseByCategory = async (year, month) => {
  try {
    const response = await axiosInstance.get(
      `/expense/month/category/totalExpense?year=${year}&month=${month}`
    );
    return response.data.result;
  } catch (error) {
    console.error("카테고리별 지출 금액 조회 실패:", error);
    throw error;
  }
};

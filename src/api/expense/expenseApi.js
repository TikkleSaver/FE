import axiosInstance from "../axiosInstance";

/**
 * 지출 생성 API
 * @param {Object} formValues - 지출 입력값
 * @param {File} file - 첨부 파일
 * @returns {Promise<Object>} API 응답
 */
export const createExpense = async (formValues, file) => {
  try {
    const formData = new FormData();

    const requestBody = {
      expenseName: formValues.expenseName,
      expensePlace: formValues.expensePlace,
      cost: formValues.cost,
      expenseDate: formValues.expenseDate,
      categoryId: formValues.categoryId,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(requestBody)], { type: "application/json" })
    );

    if (file) {
      formData.append("file", file);
    }

    const response = await axiosInstance.post("/expense", formData);
    return response.data;
  } catch (error) {
    console.error("지출 생성 실패:", error);
    throw error;
  }
};

/**
 * 특정 지출 조회 API
 * @param {Object} data - expenseId와 memberId 포함 객체
 * @returns {Promise<Object>} 지출 상세 정보
 */
export const getExpense = async (expenseId) => {
  try {
    const response = await axiosInstance.get(`/expense/${expenseId}`);
    return response.data.result;
  } catch (error) {
    console.error("지출 조회 실패:", error);
    throw error;
  }
};

/**
 * 지출 수정 API
 * @param {Object} formValues - 수정할 지출 정보
 * @param {File} file - 첨부 파일
 * @returns {Promise<Object>} API 응답
 */
export const updateExpense = async (formValues, file) => {
  try {
    const formData = new FormData();

    const requestBody = {
      expenseId: formValues.expenseId,
      expenseName: formValues.expenseName,
      expensePlace: formValues.expensePlace,
      cost: formValues.cost,
      expenseDate: formValues.expenseDate,
      categoryId: formValues.categoryId,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(requestBody)], { type: "application/json" })
    );

    if (file) {
      formData.append("file", file);
    }

    const response = await axiosInstance.patch("/expense", formData);
    return response.data;
  } catch (error) {
    console.error("지출 수정 실패:", error);
    throw error;
  }
};

/**
 * 지출 삭제 API
 * @param {Object} data - expenseId와 memberId 포함 객체
 * @returns {Promise<Object>} 삭제 결과
 */
export const deleteExpense = async (expenseId) => {
  try {
    const response = await axiosInstance.delete(`/expense/${expenseId}`);
    return response.data.result;
  } catch (error) {
    console.error("지출 삭제 실패:", error);
    throw error;
  }
};

/**
 * 지출 리스트 조회 API
 * @param {Object} params - 페이지, 지출 주인 사용자 ID, 지출 날짜 포함
 * @returns {Promise<Object>} 지출 목록 결과
 */
export const getExpenseList = async ({ page, memberId, expenseDate }) => {
  try {
    const response = await axiosInstance.get("/expense", {
      params: {
        page,
        memberId,
        expenseDate, // YYYY-MM-DD 형식
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("지출 목록 조회 실패:", error);
    throw error;
  }
};

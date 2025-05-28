import axiosInstance from "../axiosInstance";

/**
 * 지출 피드백 생성 API
 * @param {Object} formValues - 댓글 입력값 { memberId, content, expenseDate }
 * @returns {Promise<Object>} 생성된 댓글 데이터
 */
export const createExpenseComment = async (formValues) => {
  try {
    const response = await axiosInstance.post("/expenseComment", formValues);
    return response.data.result;
  } catch (error) {
    console.error("지출 피드백 생성 실패:", error);
    throw error;
  }
};

/**
 * 지출 피드백 수정 API
 * @param {Object} formValues - { expenseCommentId, memberId, content }
 * @returns {Promise<Object>} 수정된 댓글 데이터
 */
export const updateExpenseComment = async (formValues) => {
  try {
    const response = await axiosInstance.patch("/expenseComment", formValues);
    return response.data.result;
  } catch (error) {
    console.error("지출 피드백 수정 실패:", error);
    throw error;
  }
};

/**
 * 지출 피드백 삭제 API
 * @param {Object} formValues - { expenseCommentId, memberId }
 * @returns {Promise<string>} 삭제 결과 메시지
 */
export const deleteExpenseComment = async (formValues) => {
  try {
    const response = await axiosInstance.delete("/expenseComment", {
      data: formValues, // DELETE 요청에서 body 전달 시 axios는 data 속성 사용
    });
    return response.data.result;
  } catch (error) {
    console.error("지출 피드백 삭제 실패:", error);
    throw error;
  }
};

/**
 * 지출 피드백 리스트 조회 API
 * @param {Object} params - { page, memberId, expenseDate }
 * @returns {Promise<Object>} 피드백 리스트 데이터
 */
export const getExpenseCommentList = async ({
  page,
  memberId,
  expenseDate,
}) => {
  try {
    const response = await axiosInstance.get("/expenseComment", {
      params: { page, memberId, expenseDate },
    });
    console.log("지출 댓글 리스트: ", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("지출 피드백 리스트 조회 실패:", error);
    throw error;
  }
};

import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createExpense = async (formValues, file) => {
  try {
    const formData = new FormData();

    const requestBody = {
      memberId: 1, // 실제 로그인된 사용자 ID로 대체 필요
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

    const response = await axios.post(`${BASE_URL}/expense`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExpense = async (data) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/expense/${data.expenseId}/${data.memberId}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log(response);

    return response.data.result;
  } catch (error) {
    console.error("Error fetching data:", error.response);
  }
};

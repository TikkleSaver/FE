import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getdailyExpenseList = async ({ memberId, year, month }) => {
  try {
    const response = await axios.get(`${BASE_URL}/expense/dailyTotalExpense`, {
      params: { memberId, year, month },
      headers: { "Content-Type": "application/json" },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error fetching expense list:", error.response || error);
    throw error;
  }
};

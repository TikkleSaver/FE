import axiosInstance from "../axiosInstance";
import refreshAxios from "../refreshAxios";
//챌린지 검색 기능
  
    export const searchChallenges = async ({ keyword, category, page }) => {
        try {
          const response = await refreshAxios.get("/challenges/search", {
            params: {
              keyword,
              category,  // null or number
              page,
            },
          });
          return response.data.result.challengeList;
        } catch (error) {
          console.error("검색 실패:", error);
          throw error;
        }
      };
  

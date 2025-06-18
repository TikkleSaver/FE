import axiosInstance from "../axiosInstance";

export const toggleChallengeScrap = async (challengeId, currentScrapped) => {
    try {
      const res = await axiosInstance.patch(`/challenges-scrap/${challengeId}/scrap`, {
        scrapped: !currentScrapped,
      });
  
      if (res.data.isSuccess) {
        return {
          scrapped: res.data.result.scrapped,
          message: res.data.result.message,
        };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      throw error;
    }
  };
  
  export const joinChallenge = async (challengeId) => {
    try {
      const res = await axiosInstance.post(`/join-challenges/${challengeId}`);
      if (res.data.isSuccess) {
        return res.data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      throw error;
    }
  };
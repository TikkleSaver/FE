import axiosInstance from "../axiosInstance";

export const fetchChallenge = async (challengeId) => {
    try {
        const res = await axiosInstance.get(`/join-challenges/${challengeId}`);
        return res.data.result;
      } catch (error) {
        console.error('챌린지 정보 불러오기 실패:', error);
      }
  };


  export const fetchChallengerList = async (challengeId, page) => {
    try {
      const res = await axiosInstance.get(`/join-challenges/${challengeId}/challenger-list`, {
        params: { page },
      });
  
      return res.data.result; 
    } catch (err) {
      console.error("챌린지 리스트 로드 실패:", err);
      throw err;
    }
  };


export const submitMissionProof = async (challengeId, date, content, file) => {
  const formData = new FormData();

  formData.append(
    "request",
    new Blob([JSON.stringify({ date, content })], {
      type: "application/json",
    })
  );

  if (file) {
    formData.append("file", file);
  }

  try {
    const response = await axiosInstance.post(
      `/mission-proof/${challengeId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("미션 인증 실패:", error);
    throw error;
  }
};
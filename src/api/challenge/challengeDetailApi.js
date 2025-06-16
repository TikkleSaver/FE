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

export const getMonthlyProofs = async (challengeId, year, month) => {
    try {
      const response = await axiosInstance.get(`/mission-proof/${challengeId}/month`, {
        params: { year, month }
      });
      console.log("인증 데이터 불러오기 성공:", response.data); 
      return response.data;
    } catch (error) {
      console.error("인증 데이터 불러오기 실패:", error); 
      throw error; 
    }
  };


export const updateMissionProof = async (missionProofId, requestData, imageFile) => {
    const formData = new FormData();
    if (!missionProofId) {
        console.error("missionProofId가 없습니다.");
        return;
      }
    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );
  
    if (imageFile) {
      formData.append("file", imageFile);
    }
  
    try {
      const response = await axiosInstance.patch(
        `/mission-proof/${missionProofId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("미션 인증 수정 실패:", error);
      throw error;
    }
  };

  export const deleteMissionProof = async (missionProofId) => {
    const response = await axiosInstance.delete(`/mission-proof/${missionProofId}`);
    return response.data;
  };

  export const getMissionProofMain = async (challengeId) => {
    try {
      const response = await axiosInstance.get(`/mission-proof/${challengeId}/main`);
      return response.data.result;
    } catch (error) {
      console.error('미션 인증 메인 조회 실패:', error);
      throw error;
    }
  };

  export const getRequestList = async (challengeId,page) => {
    try {
      const res = await axiosInstance.get(`/join-challenges/${challengeId}/request-list`, {
        params: { page },
      });
      return res.data.result;
    } catch (error) {
      console.error('챌린지 요청 챌린저 조회 실패', error);
      throw error;
    }
  }

  export const acceptJoinRequest = async (joinChallengeId) => {
    const response = await axiosInstance.post(`/join-challenges/${joinChallengeId}/accept`);
    return response.data.result;
  };
  
  export const rejectJoinRequest = async (joinChallengeId) => {
    const response = await axiosInstance.delete(`/join-challenges/${joinChallengeId}/delete`);
    return response.data.result;
  };
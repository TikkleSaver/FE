import axiosInstance from "../axiosInstance";

export const createChallenge = async (challengeData, imageFile) => {
    const formData = new FormData();
    formData.append("request", new Blob([JSON.stringify(challengeData)], { type: "application/json" }));
  
    if (imageFile) {
      formData.append("file", imageFile); // 'file' 이름 그대로
    }
  
    try {
      const res = await axiosInstance.post(`/challenges`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (res.data.isSuccess) {
        return res.data;
      } else {
        throw new Error(res.data.message || "챌린지 생성 실패");
      }
    } catch (err) {
      throw err;
    }
  };
  
  
  export const updateChallenge = async (challengeId, formData) => {
    try {
      const res = await axiosInstance.patch(`/challenges/${challengeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
  
      if (res.data.isSuccess) {
        return res.data;
      } else {
        throw new Error(res.data.message || "챌린지 수정 실패");
      }
    } catch (err) {
      throw err;
    }
  };

  export const deleteChallenge = async (challengeId) => {
    const response = await axiosInstance.delete(`/challenges/${challengeId}`);
    return response.data;
  };

  export const fetchTop4Challenges = async () => {
    const response = await axiosInstance.get('/challenges/top4-lists'); 
    return response.data.result; 
  };
import axiosInstance from '../axiosInstance';
import refreshAxios from '../refreshAxios';

export const fetchChallengeList = async (category, page) => {
  try {
    const response = await refreshAxios.get(`/challenges/lists`, {
      params: { category, page },
    });
    return response.data.result;
  } catch (error) {
    console.error('챌린지 리스트 로드 실패:', error);
    throw error;
  }
};

export const fetchJoinChallengeList = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `/join-challenges/members/${memberId}`
    );
    return response.data.result;
  } catch (error) {
    console.error('참여중 챌린지 리스트 로드 실패:', error);
    throw error;
  }
};

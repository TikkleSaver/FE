import axios from "axios";

const ClientID = process.env.REACT_APP_NAVER_CLIENT_ID;
const ClientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

const api = axios.create({
  baseURL: "/v1", 
  headers: {
    "X-Naver-Client-Id": ClientID,
    "X-Naver-Client-Secret": ClientSecret,
  },
});

export const fetchShoppingData = async ({ query, page = 1, display = 12 }) => {
  const start = (page - 1) * display + 1;

  const response = await api.get("/search/shop.json", {
    params: {
      query,
      display,
      start,
    },
  });

  return response.data;
};
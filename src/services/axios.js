import axios from "axios";

const baseUrl = "https://ice-cream-places-api.vercel.app";
// const baseUrl = "http://localhost:5014";

export const useAxios = () => {
  return axios.create({
    baseURL: baseUrl,
  });
};

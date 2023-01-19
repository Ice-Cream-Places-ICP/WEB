import axios from "axios";

export const baseUrl = "https://ice-cream-places-api.vercel.app";
// export const baseUrl = "http://localhost:5014";

/** 
 * @deprecated, e.g. instead of api.get('shop') use axios.get(`${baseUrl}/shop`)
 */
export const useAxios = () => {
  return axios.create({
    baseURL: baseUrl,
  });
};

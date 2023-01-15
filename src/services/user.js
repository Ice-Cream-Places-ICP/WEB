import axios from "axios";
import { baseUrl } from "./api";
import { useAuthHeader } from "./useAuthHeader";

export const GetAllUsers = async () => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .get(`${baseUrl}/users/all`, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.resposne.data;
    });
};

export const GetUser = async () => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .get(`${baseUrl}/users`, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const GetUserById = async (userId) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .get(`${baseUrl}/users/${userId}`, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const UpdateUserById = async (userId, user) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .patch(`${baseUrl}/users/${userId}`, user, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

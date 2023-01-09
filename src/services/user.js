import { useAxios } from "./axios";
import { useAuthHeader } from "./useAuthHeader";

export const GetAllUsers = async () => {
  const authHeader = useAuthHeader();
  const api = useAxios();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await api
    .get("users/all", authHeader)
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
  const api = useAxios();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await api
    .get("users", authHeader)
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
  const api = useAxios();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  await api
    .get(`users/${userId}`, authHeader)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const UpdateUserById = async (userId, user) => {
  const authHeader = useAuthHeader();
  const api = useAxios();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  await api
    .patch(`users/${userId}`, user, authHeader)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

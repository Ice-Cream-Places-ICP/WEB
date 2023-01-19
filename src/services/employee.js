import axios from "axios";
import { useAxios, baseUrl } from "./axios";
import { useAuthHeader } from "./useAuthHeader";

export const AcceptIvitation = async (notificationId) => {
  const authHeader = useAuthHeader();
  const api = useAxios();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await api
    .post(`users/shop-invitations/${notificationId}/accept`, {}, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const DeclineIvitation = async (notificationId) => {
  const authHeader = useAuthHeader();
  const api = useAxios();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await api
    .post(`users/shop-invitations/${notificationId}/decline`, {}, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const CreateEmployee = async (shopId, employee) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .post(`${baseUrl}/shops/${shopId}/employees`, employee, authHeader)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const UpdateEmployee = async (shopId, employee) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .patch(`${baseUrl}/shops/${shopId}/employees`, employee, authHeader)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const DeleteEmployee = async (shopId, employee) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .delete(`${baseUrl}/shops/${shopId}/employees/${employee.email}`, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

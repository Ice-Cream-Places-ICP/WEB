import axios from "axios";
import { baseUrl } from "./api";
import { useAuthHeader } from "./useAuthHeader";

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

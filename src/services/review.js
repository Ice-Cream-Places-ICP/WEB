import axios from "axios";
import { baseUrl } from "./api";
import { useAuthHeader } from "./useAuthHeader";

export const CreateReview = async (shopId, reviewContent) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .post(`${baseUrl}/shops/${shopId}/review`, reviewContent, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const UpdateReview = async (shopId, reviewId, reviewContent) => {
  const authHeader = useAuthHeader();
  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .patch(`${baseUrl}/shops/${shopId}/review/${reviewId}`, reviewContent, authHeader)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const DeleteReview = async (shopId, reviewId) => {
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await axios
    .delete(`${baseUrl}/shops/${shopId}/review/${reviewId}`, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

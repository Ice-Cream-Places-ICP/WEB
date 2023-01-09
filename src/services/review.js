import { useAxios } from "./axios";
import { useAuthHeader } from "./useAuthHeader";

export const CreateReview = async (shopId, reviewContent) => {
  const api = useAxios();
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await api
    .post(`shops/${shopId}/review`, reviewContent, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const DeleteReview = async (shopId, reviewId) => {
  const api = useAxios();
  const authHeader = useAuthHeader();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await api
    .delete(`shops/${shopId}/review/${reviewId}`, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

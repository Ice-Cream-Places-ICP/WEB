import { useAxios } from "./axios";
import { useAuthHeader } from "./useAuthHeader";

export const GetShops = async () => {
  const api = useAxios();
  return await api
    .get("shops")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const GetShopById = async (shopId) => {
  const api = useAxios();

  return await api
    .get(`shops/${shopId}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const CreateShop = async (shop) => {
  const authHeader = useAuthHeader();
  const api = useAxios();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await api
    .post("shops", shop, authHeader)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const UpdateShopById = async (shopId, shop) => {
  const authHeader = useAuthHeader();
  const api = useAxios();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await api
    .patch(`shops/${shopId}`, shop, authHeader)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const DeleteShopById = async (shopId) => {
  const authHeader = useAuthHeader();
  const api = useAxios();

  if (!authHeader) return { message: "Błąd tokena autoryzacji" };

  return await api
    .delete(`shops/${shopId}`, authHeader)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

import api from "./api";

export const getShop = async (id) => {
  try {
    const res = await api.get(`/shops/${id}`);
    return res.data;
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.header);
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
};

export const getShops = async () => {
  try {
    const res = await api.get("/shops");
    return res.data;
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.header);
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
};

export const createShop = async (name, address, flavors) => {
  try {
    const res = await api.post("/shops", {
      name: name,
      address: address,
      flavors: flavors,
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.header);
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
};

export const updateShop = async () => {
  // return res;
};

export const deleteShop = async (id) => {
  try {
    const res = await api.delete(`/shops${id}`);
    return res.data;
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.header);
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
};

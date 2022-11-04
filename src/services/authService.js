import api from "./api";

export const registerUser = async (email, password) => {
  try {
    const res = await api.post("/auth/register", {
      email: email,
      password: password,
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

export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", {
      email: email,
      password: password,
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

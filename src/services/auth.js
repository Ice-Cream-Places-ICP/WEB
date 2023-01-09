import { useAxios } from "./axios";

export const Login = async (email, password) => {
  const api = useAxios();

  return await api
    .post("auth/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      if (!response.data.content.token) {
        console.log("error with token");
        return { message: "Błąd tokena autoryzacji." };
      }
      localStorage.setItem(
        "token",
        JSON.stringify(response.data.content.token)
      );
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const Register = async (email, password) => {
  const api = useAxios();

  return await api
    .post("auth/register", {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const ResendEmail = async (email) => {
  const api = useAxios();

  return await api
    .post("mail/resend-confirmation", {
      email: email,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const AuthConfirmEmail = async (key) => {
  const api = useAxios();
  if (!key) return { message: "Nieprawidłowy klucz aktywacji." };

  return api
    .get(`auth/confirm/${key}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const Logout = () => {
  if (!JSON.parse(localStorage.getItem("token"))) return;
  localStorage.removeItem("token");
};

export const CheckIfLogin = () => {
  if (JSON.parse(localStorage.getItem("token"))) return true;
  return false;
};

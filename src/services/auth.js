import axios from "axios";
import { baseUrl } from "./api";

export const SetNewPasswordAuth = async (password, resetCode) => {
  return await axios
    .post(`${baseUrl}/auth/reset-password/${resetCode}`, { password: password })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const ResetPasswordAuth = async (email) => {
  return await axios
    .post(`${baseUrl}/auth/reset-password`, { email: email })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const Login = async (email, password) => {
  return await axios
    .post(`${baseUrl}/auth/login`, {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
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
  return await axios
    .post(`${baseUrl}/auth/register`, {
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
  return await axios
    .post(`${baseUrl}/mail/resend-confirmation`, {
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
  if (!key) return { message: "Nieprawidłowy klucz aktywacji." };

  return axios
    .get(`${baseUrl}/auth/confirm/${key}`)
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

export const CheckIfLogin = async () => {
  if (await JSON.parse(localStorage.getItem("token"))) return true;
  return false;
};

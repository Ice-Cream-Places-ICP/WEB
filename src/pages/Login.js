import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";

// Components
import LoginForm from "../components/forms/LoginForm";

// MUI
import { Link as MuiLink } from "@mui/material";

// Services
import { loginUser } from "../services/authService";

const Login = () => {
  const [loginOk, setLoginOk] = useState(false);
  const [loginHelperText, setLoginHelperText] = useState("");

  const handleSubmit = async (email, password) => {
    setLoginHelperText("");

    const data = await loginUser(email, password);
    console.log(data);

    if (!data || !data.status) {
      setLoginHelperText("Wystąpił błąd logowania");
      return;
    }

    setLoginOk(true);
  };

  if (loginOk) {
    return (
      <div>
        Logowanie przebiegło pomyślnie, możesz przejść na{" "}
        <MuiLink component={Link} to="/">
          stronę główną
        </MuiLink>
      </div>
    );
  }
  return (
    <>
      <LoginForm
        loginHelperText={loginHelperText}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;

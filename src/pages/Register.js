import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";

// Components
import RegisterForm from "../components/forms/RegisterForm";

// MUI
import { Link as MuiLink } from "@mui/material";

// Services
import { registerUser } from "../services/authService";

const Register = () => {
  const [registerOk, setRegisterOk] = useState(false);
  const [registerHelperText, setRegisterHelperText] = useState("");

  const handleSubmit = async (email, password) => {
    setRegisterHelperText("");

    const data = await registerUser(email, password);
    console.log(data);

    if (!data || !data.status) {
      setRegisterHelperText("Wystąpił błąd rejestracji");
      return;
    }

    setRegisterOk(true);
  };

  if (registerOk) {
    return (
      <div>
        Rejestracja przebiegła pomyślnie, możesz się{" "}
        <MuiLink component={Link} to="/login">
          zalogować
        </MuiLink>
      </div>
    );
  }
  return (
    <>
      <RegisterForm
        registerHelperText={registerHelperText}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Register;

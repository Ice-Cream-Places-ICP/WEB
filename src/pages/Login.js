import { Link, useNavigate } from "react-router-dom";

// Hooks

// MUI
import { Link as MuiLink, Typography } from "@mui/material";

import validator from "validator";

// Hooks
import { useState, useRef } from "react";

// MUI
import {
  TextField,
  Button,
  FormHelperText,
  FormControl,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";

import { Login } from "../services/auth";
import ResendEmailConfirmation from "../components/ResendEmailConfirmation";
import Loading from "../components/Loading";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { baseUrl } from "../services/api";
import ResetPassword from "../components/ResetPassword";

const Logins = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");
  const [error, setError] = useState("");
  const [resendEmailForm, setResendEmailForm] = useState(false);
  const [resetPasswordForm, setResetPasswordForm] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!validator.isEmail(email.current.value)) {
      setError("Nieprawidłowy adres email.");
      setLoading(false);
      return;
    }

    if (
      !validator.isStrongPassword(password.current.value, {
        minUppercase: 1,
        minSymbols: 1,
        minLenght: 8,
        returnScore: false,
      })
    ) {
      setError(
        "Hasło musi składać się z minimum 1 dużej litery, minimum 1 znaku specjalnego i zawierać minimum 8 znaków."
      );
      setLoading(false);
      return;
    }

    const loginData = await Login(email.current.value, password.current.value);
    if (!loginData.status) {
      setError(loginData.message);
      setLoading(false);
      return;
    }

    navigate("/login/success");
  };

  const handleLoginWithGoogle = (e) => {
    e.preventDefault();
    window.open(`${baseUrl}/auth/google/`, "_self");
  };

  const handleLoginWithFacebook = (e) => {
    e.preventDefault();
    window.open(`${baseUrl}/auth/facebook/`, "_self");
  };

  if (loading) return <Loading />;

  return (
    <>
      <Card className="card">
        <CardHeader className="card-header" title="Zaloguj się" />

        <CardContent className="card-content">
          {error && <div className="error">{error}</div>}
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="flex-column">
              <FormControl>
                <TextField
                  fullWidth
                  inputRef={email}
                  type="text"
                  id="email"
                  label="Email"
                />
                <FormHelperText></FormHelperText>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  inputRef={password}
                  type="password"
                  id="password"
                  label="Hasło"
                />
                <FormHelperText></FormHelperText>
              </FormControl>

              <Button fullWidth type="submit" variant="contained">
                Zaloguj się
              </Button>
            </div>
          </form>
          <div className="flex-row">
            <Button
              startIcon={<FcGoogle />}
              fullWidth
              variant="outlined"
              onClick={(e) => handleLoginWithGoogle(e)}
            >
              <strong>Google</strong>
            </Button>
            <Button
              startIcon={<FaFacebook style={{ color: "#3b5998" }} />}
              fullWidth
              variant="outlined"
              onClick={(e) => handleLoginWithFacebook(e)}
            >
              <strong>Facebook</strong>
            </Button>
          </div>
          <br />
          <Typography variant="body1">
            Nie pamiętasz hasła? Kliknij{" "}
            <MuiLink
              color="text.secondary"
              component={Link}
              onClick={() => {
                setResetPasswordForm(() => !resetPasswordForm);
              }}
            >
              <strong>tutaj</strong>
            </MuiLink>
            , aby je zresetować.
          </Typography>
          <Typography variant="body1">
            Nie masz konta? Kliknij{" "}
            <MuiLink color="text.secondary" component={Link} to="/register">
              <strong>tutaj</strong>
            </MuiLink>
            , aby je założyć.
          </Typography>
          <Typography variant="body1">
            Nie dostałeś maila z potwierdzeniem rejestracji? Kliknij{" "}
            <MuiLink
              color="text.secondary"
              component={Link}
              onClick={() => {
                setResendEmailForm(() => !resendEmailForm);
              }}
            >
              <strong>tutaj</strong>
            </MuiLink>
            , aby go wysłać ponownie.
          </Typography>

          {resendEmailForm && (
            <Card className="card">
              <CardHeader
                className="card-header"
                title="Wpisz adres email, użyty przy rejestracji"
              />
              <CardContent className="card-content">
                <ResendEmailConfirmation
                  setResendEmailForm={setResendEmailForm}
                  setErrorLogin={setError}
                />
              </CardContent>
            </Card>
          )}
          {resetPasswordForm && (
            <Card className="card">
              <CardHeader
                className="card-header"
                title="Wpisz adres email, użyty przy rejestracji"
              />
              <CardContent className="card-content">
                <ResetPassword />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Logins;

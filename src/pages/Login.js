import { Link, useAsyncError, useNavigate } from "react-router-dom";

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

import { useUser } from "../context/UserContext";
import { Login } from "../services/auth";
import { GetUser } from "../services/user";
import { ColorRing } from "react-loader-spinner";
import ResendEmailConfirmation from "../components/ResendEmailConfirmation";
import Loading from "../components/Loading";

const Logins = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");
  const [error, setError] = useState("");
  const [resendEmailForm, setResendEmailForm] = useState(false);

  const user = useUser();

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

    const userData = await GetUser();
    if (!userData.status) {
      setError("Bład pobierania danych o użytkowniku.");
      setLoading(false);
      return;
    }

    user.setUser(userData.content);
    navigate("/");
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
          <br />
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
        </CardContent>
      </Card>
    </>
  );
};

export default Logins;

// Hooks

// Services
import { Register } from "../services/auth";
import { Link } from "react-router-dom";
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
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Loading from "../components/Loading";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { baseUrl } from "../services/api";

const Registers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const email = useRef("");
  const password = useRef("");
  const password2 = useRef("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password.current.value !== password2.current.value) {
      setError("Hasła muszą się zgadzać");
      setLoading(false);
      return;
    }

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

    const registerData = await Register(
      email.current.value,
      password.current.value
    );

    if (!registerData.status) {
      setError(registerData.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
  };

  const handleRegisterWithGoogle = (e) => {
    e.preventDefault();
    window.open(`${baseUrl}/auth/google/`, "_self");
  };

  const handleRegisterWithFacebook = (e) => {
    e.preventDefault();
    window.open(`${baseUrl}/auth/facebook/`, "_self");
  };

  if (loading) return <Loading />;

  if (success)
    return (
      <Card className="card">
        <CardContent className="card-content">
          <Typography variant="body1">
            Rejestracja przebiegła pomyślnie <br />
            Sprawdź swój adres email, aby aktywować swoje konto. Kliknij{" "}
            <MuiLink color="text.secondary" component={Link} to="/login">
              <strong>tutaj</strong>
            </MuiLink>{" "}
            aby się zalogować.
          </Typography>
        </CardContent>
      </Card>
    );

  return (
    <Card className="card">
      <CardHeader className="card-header" title="Zarejestruj się" />

      <CardContent className="card-content">
        {error && <div className="error">{error}</div>}{" "}
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

            <FormControl>
              <TextField
                fullWidth
                inputRef={password2}
                type="password"
                id="password2"
                label="Powtórz hasło"
              />
              <FormHelperText></FormHelperText>
            </FormControl>

            <Button fullWidth type="submit" variant="contained">
              Zarejestruj się
            </Button>
          </div>
        </form>
        <div className="flex-row">
          <Button
            startIcon={<FcGoogle />}
            fullWidth
            variant="outlined"
            onClick={(e) => handleRegisterWithGoogle(e)}
          >
            <strong>Google</strong>
          </Button>
          <Button
            startIcon={<FaFacebook style={{ color: "#3b5998" }} />}
            fullWidth
            variant="outlined"
            onClick={(e) => handleRegisterWithFacebook(e)}
          >
            <strong>Facebook</strong>
          </Button>
        </div>
        <br />
        <Typography variant="body1">
          Masz już konto? Kliknij{" "}
          <MuiLink color="text.secondary" component={Link} to="/login">
            <strong>tutaj</strong>
          </MuiLink>
          , aby się zalogować.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Registers;

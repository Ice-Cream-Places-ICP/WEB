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
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Loading from "../components/Loading";

const Registers = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const email = useRef("");
  const password = useRef("");

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

    const registerData = await Register(
      email.current.value,
      password.current.value
    );

    if (!registerData.status) {
      setError(registerData.message);
      setLoading(false);
      return;
    }

    navigate("/login");
  };

  if (loading) return <Loading />;

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

            <Button fullWidth type="submit" variant="contained">
              Zarejestruj się
            </Button>
          </div>
        </form>
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

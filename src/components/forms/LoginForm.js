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

const LoginForm = ({ loginHelperText, handleSubmit }) => {
  const [emailHelperText, setEmailHelperText] = useState("Wpisz adres email");
  const [passwordHelperText, setPasswordHelperText] = useState("Wpisz hasło");

  const email = useRef(null);
  const password = useRef(null);

  const handleEmailChange = (e) => {
    if (e.target.value === "") {
      setEmailHelperText("Wpisz adres email");
      return;
    }

    if (!validator.isEmail(email.current.value)) {
      setEmailHelperText("Nieprawidłowy adres email");
      return;
    }

    setEmailHelperText("");
  };

  const handlePasswordChange = (e) => {
    if (e.target.value === "") {
      setPasswordHelperText("Wpisz hasło");
      return;
    }

    if (
      !validator.isStrongPassword(password.current.value, {
        minUppercase: 0,
        minSymbols: 0,
        minLenght: 8,
        returnScore: false,
      })
    ) {
      setPasswordHelperText(
        "Hasło musi zawierać minimum 8 znaków (w tym conajmniej 1 literę oraz 1 cyfrę)"
      );
      return;
    }

    setPasswordHelperText("");
  };

  return (
    <Card className="card">
      <CardHeader className="card-header" title="Zaloguj się" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(email.current.value, password.current.value);
        }}
      >
        <CardContent className="card-content">
          <div className="flex-column">
            <FormControl
              error={emailHelperText !== "" || loginHelperText !== ""}
            >
              <TextField
                fullWidth
                onChange={(e) => {
                  handleEmailChange(e);
                }}
                inputRef={email}
                type="text"
                id="email"
                label="Email"
                error={emailHelperText !== "" || loginHelperText !== ""}
              />
              <FormHelperText>
                {emailHelperText || loginHelperText}
              </FormHelperText>
            </FormControl>

            <FormControl error={passwordHelperText !== ""}>
              <TextField
                fullWidth
                onChange={(e) => {
                  handlePasswordChange(e);
                }}
                inputRef={password}
                type="password"
                id="password"
                label="Hasło"
                error={passwordHelperText !== ""}
              />
              <FormHelperText>{passwordHelperText}</FormHelperText>
            </FormControl>

            <Button
              fullWidth
              disabled={emailHelperText !== "" || passwordHelperText !== ""}
              type="submit"
              variant="contained"
            >
              Zaloguj się
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default LoginForm;

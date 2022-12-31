import validator from "validator";
import { ResendEmail } from "../services/auth";
import { Button, TextField } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import { useEffect, useState } from "react";

const ResendEmailConfirmation = ({ setResendEmailForm, setErrorLogin }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const handleResendEmail = async () => {
    setLoading(true);
    if (!validator.isEmail(email)) {
      setError("Nieprawidłowy adres email.");
      setLoading(false);
      return;
    }
    const resendData = await ResendEmail(email);

    if (!resendData.status) {
      setError(resendData.message);
      setLoading(false);
      return;
    }

    setOk(
      "Wiadomość została wysłana, sprawdź swojego maila (wiadomość mogła powędrować do folderu SPAM)."
    );
    setLoading(false);
    await delay(7000);
    setResendEmailForm(false);
  };

  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  useEffect(() => {
    setErrorLogin("");
  }, []);

  if (loading)
    return (
      <div className="flex-row full-width flex-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );

  return (
    <>
      {error && <div className="error">{error}</div>}
      {ok && <div className="ok">{ok}</div>}
      <TextField
        fullWidth
        type="text"
        id="name"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button
        disabled={!email}
        fullWidth
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          handleResendEmail();
        }}
      >
        Wyślij ponownie
      </Button>
    </>
  );
};
export default ResendEmailConfirmation;

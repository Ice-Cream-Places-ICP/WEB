import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthConfirmEmail } from "../services/auth";

const ConfirmEmail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const params = useParams();

  useEffect(() => {
    setError("");
    const sendConfirm = async (key) => {
      const sendConfirmData = await AuthConfirmEmail(key);
      if (!sendConfirmData.status) {
        setError(sendConfirmData.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      return;
    };

    setLoading(true);
    sendConfirm(params.id);
  }, [params.id]);

  if (loading) return <Loading />;
  return (
    <Card className="card">
      <CardHeader className="card-header" title="Aktywacja konta" />
      {confirmation && (
        <CardContent className="card-content">
          <Typography variant="body1">
            Twoje konto jest już aktywne. Możesz się zalogować klikając{" "}
            <MuiLink component={Link} color="text.secondary" to="/login">
              <strong>tutaj</strong>
            </MuiLink>
          </Typography>
        </CardContent>
      )}
      {!confirmation && (
        <CardContent className="card-content">
          {error && <div className="error">{error}</div>}
          <Typography variant="body1">
            Przejdź na stronę główną klikając{" "}
            <MuiLink component={Link} color="text.secondary" to="/">
              <strong>tutaj</strong>
            </MuiLink>
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default ConfirmEmail;

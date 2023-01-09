import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const Lost = () => {
  return (
    <Card className="card">
      <CardHeader
        className="card-header"
        title="Upsss... Wygląda na to, że się zgubiłeś..."
      />
      <CardContent className="card-content">
        <Typography>
          Lub nie masz uprawnień, aby przeglądać zawartość tej podstrony. Jeśli
          jesteś użytkownikiem, możesz nie być zalogowany. Kliknij{" "}
          <MuiLink color="text.secondary" component={Link} to="/login">
            <strong>tutaj</strong>
          </MuiLink>{" "}
          aby się zalogować.
        </Typography>
        <Typography>
          Lub{" "}
          <MuiLink color="text.secondary" component={Link} to="/">
            <strong>tutaj</strong>
          </MuiLink>{" "}
          aby przejść na stronę główną.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Lost;

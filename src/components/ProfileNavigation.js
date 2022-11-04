import { Card, CardContent, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileNavigation = () => {
  return (
    <Card className="card">
      <CardContent className="card-content">
        <MuiLink component={Link} to="view">
          Przeglądaj
        </MuiLink>
        <MuiLink component={Link} to="edit">
          Edytuj
        </MuiLink>
      </CardContent>
    </Card>
  );
};

export default ProfileNavigation;

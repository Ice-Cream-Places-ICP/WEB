import { Card, CardContent, Link as MuiLink, Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const ProfileNavigation = () => {
  const { pathname } = useLocation();

  return (
    <Card className="card">
      <CardContent className="card-content">
        <Grid container>
          <Grid item xs={12} sm={3}>
            <MuiLink
              to="view"
              component={Link}
              className={pathname.includes("view") ? "active-link" : ""}
            >
              Przeglądaj
            </MuiLink>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiLink
              to="edit"
              component={Link}
              className={pathname.includes("edit") ? "active-link" : ""}
            >
              Edytuj
            </MuiLink>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiLink
              to="favorite"
              component={Link}
              className={pathname.includes("favorite") ? "active-link" : ""}
            >
              Ulubione
            </MuiLink>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiLink
              to="/shop"
              component={Link}
              className={pathname.includes("shop") ? "active-link" : ""}
            >
              Lodziarnie
            </MuiLink>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileNavigation;

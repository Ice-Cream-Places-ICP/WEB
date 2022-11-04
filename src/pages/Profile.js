import { Typography, Card, CardContent, CardHeader, Grid } from "@mui/material";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useRouteMatch,
} from "react-router-dom";

import ProfileNavigation from "../components/ProfileNavigation";

const Profile = () => {
  return (
    <Card className="card">
      <CardHeader
        title={<Typography variant="h5">Zarządzaj profilem</Typography>}
        className="card-header"
      />
      <CardContent className="card-content">
        <Grid container>
          <Grid item xs={12} sm={3}>
            <ProfileNavigation />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Outlet />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Profile;

import { Typography, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useRouteMatch,
} from "react-router-dom";
import Loading from "../components/Loading.js";

import ProfileNavigation from "../components/ProfileNavigation.js";
import { useUser } from "../context/UserContext.js";
import { GetUser } from "../services/user.js";

const Profile = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const userContext = useUser();

  useEffect(() => {
    setError("");
    const populateUser = async () => {
      const userGetData = GetUser();
      if (!userGetData.status) {
        setError(userGetData.message);
        setLoading(false);
        return;
      }

      userContext.setUser(userGetData.content);
      setLoading(false);
    };

    setLoading(true);
    populateUser();
  }, []);

  if (loading) return <Loading />;
  if (!userContext.user) return <Loading />;

  return (
    <Card className="card">
      <CardHeader
        title={<Typography variant="h5">Zarządzaj profilem</Typography>}
        className="card-header"
      />
      <CardContent className="card-content">
        {error && <div className="error">{error}</div>}
        <Grid container>
          <Grid item xs={12}>
            <ProfileNavigation />
          </Grid>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Profile;

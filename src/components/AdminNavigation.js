import {
  Card,
  CardContent,
  Grid,
  Link as MuiLink,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const AdminNavigation = () => {
  const { pathname } = useLocation();

  return (
    <Card className="card">
      <CardContent className="card-content">
        <Grid container>
          <Grid item xs={12} sm={3}>
            <MuiLink
              to="shops"
              component={Link}
              className={pathname.includes("shops") ? "active-link" : ""}
            >
              Lodziarnie
            </MuiLink>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiLink
              to="users"
              component={Link}
              className={pathname.includes("users") ? "active-link" : ""}
            >
              Użytkownicy
            </MuiLink>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AdminNavigation;

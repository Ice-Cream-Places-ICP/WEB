import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { GetUser } from "../services/user";
import Loading from "./Loading";

const ProfileView = () => {
  const userContext = useUser();

  if (!userContext.user) return <Loading />;

  return (
    <Card className="card">
      <CardHeader
        className="card-header"
        title={<Typography variant="h5">Przeglądaj profil</Typography>}
      />
      <CardContent className="card-content">
        <div className="flex-column">
          <div className="flex-row">
            <Typography>
              <strong>id konta: </strong>
            </Typography>
            <Typography>{userContext.user._id}</Typography>
          </div>
          <div className="flex-row">
            <Typography>
              <strong>Adres email: </strong>
            </Typography>
            <Typography>{userContext.user.email}</Typography>
          </div>
          <div className="flex-row">
            <Typography>
              <strong>Status konta: </strong>
            </Typography>
            <Typography>
              {userContext.user.status === "active" ? "aktywne" : "nieaktywne"}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileView;

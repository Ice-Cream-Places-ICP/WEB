import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { AcceptIvitation, DeclineIvitation } from "../services/employee";
import { GetUser } from "../services/user";
import Loading from "./Loading";

const NotificationShopInvitation = ({ notifi }) => {
  const [loading, setLoading] = useState(false);
  const userContext = useUser();

  const updateUser = async () => {
    const userData = await GetUser();
    if (userData.status) {
      await userContext.setUser(userData.content);
    }
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    setLoading(true);
    const acceptData = await AcceptIvitation(notifi._id);
    if (acceptData.status) {
      await updateUser();
    }
    setLoading(false);
  };

  const handleDecline = async (e) => {
    e.preventDefault();
    setLoading(true);
    const declineData = await DeclineIvitation(notifi._id);
    if (declineData.status) {
      await updateUser();
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <div className="flex-column full-width">
      <Typography variant="h6">
        Lodziarnia <strong>{notifi.shop.name}</strong> zaprasza Cię do pracy na
        stanowisko <strong>{notifi.shop.jobPosition}</strong>
      </Typography>
      <div className="flex-row">
        <Button variant="outlined" onClick={handleDecline}>
          Odmów
        </Button>
        <Button variant="contained" onClick={handleAccept}>
          Akceptuj
        </Button>
      </div>
    </div>
  );
};
export default NotificationShopInvitation;

import { useState } from "react";
import { useUser } from "../context/UserContext";
import { GetUser, RemoveNotification } from "../services/user";
import { IoClose } from "react-icons/io5";
import { Button, IconButton, Typography } from "@mui/material";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";

const NotificationShopUpdate = ({ notifi }) => {
  const [loading, setLoading] = useState(false);
  const userContext = useUser();

  const navigate = useNavigate();

  const updateUser = async () => {
    const userData = await GetUser();
    if (userData.status) {
      await userContext.setUser(userData.content);
    }
  };

  const handleShow = async (e) => {
    e.preventDefault();
    await handleRemove(e);
    navigate(`/shop/${notifi.shop.id}`);
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    setLoading(true);
    const removeData = await RemoveNotification(notifi._id);
    if (removeData.status) {
      await updateUser();
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <div className="flex-row full-width flex-center flex-space-between">
      <div className="flex-column">
        <Typography variant="h6">
          Lodziarnia <strong>{notifi.shop.name}</strong>
          {notifi.shop.modifiedPath === "openingHours" &&
            " zmieniła godziny otwarcia"}
          {notifi.shop.modifiedPath === "flavors" && " zmieniła menu smaków"}
        </Typography>
        <div>
          <Button onClick={handleShow} variant="contained">
            Pokaż
          </Button>
        </div>
      </div>
      <IconButton variant="outlined" onClick={handleRemove}>
        <IoClose />
      </IconButton>
    </div>
  );
};

export default NotificationShopUpdate;

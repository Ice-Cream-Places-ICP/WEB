import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNotification } from "../context/NotificationContext";
import { useUser } from "../context/UserContext";
import Loading from "./Loading";
import NotificationShopInvitation from "./NotificationShopInvitation";
import NotificationShopUpdate from "./NotificationShopUpdate";

const ProfileNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userContext = useUser();

  if (loading) return <Loading />;
  if (userContext.user.notifications.length <= 0)
    return (
      <Card className="card-profile">
        <CardHeader className="card-header-profile" title="Powiadomienia" />
        <CardContent className="card-content-profile">
          Brak powiadomień
        </CardContent>
      </Card>
    );
  return (
    <Card className="card-profile">
      <CardHeader className="card-header-profile" title="Powiadomienia" />
      <CardContent className="card-content-profile">
        <List>
          {userContext.user &&
            userContext.user.notifications.map((notifi) => (
              <div key={notifi._id}>
                <ListItem>
                  {notifi.type === "shopInvitation" && (
                    <NotificationShopInvitation notifi={notifi} />
                  )}
                  {notifi.type === "shopUpdate" && (
                    <NotificationShopUpdate notifi={notifi} />
                  )}
                </ListItem>
                <div>
                  <Divider
                    style={{
                      marginBottom: "1rem",
                      paddingBottom: "1rem",
                    }}
                  />
                </div>
              </div>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};
export default ProfileNotification;

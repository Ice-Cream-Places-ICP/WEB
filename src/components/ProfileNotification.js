import {
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
import { CiCircleRemove } from "react-icons/ci";
import { useNotification } from "../context/NotificationContext";
import Loading from "./Loading";

const ProfileNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const notificationContext = useNotification();

  const handleRemoveNotification = async (e, notifi) => {
    e.preventDefault();
    setLoading(true);
    // const removeNotificationData = await RemoveNotification(notifi.id);
    // if (!removeNotificationData.status) {
    //   setError(removeNotificationData.message);
    //   setLoading(false);
    //   return;
    // }
    // const arr = notificationContext.notification;
    // arr.findIndex((obj) => obj.id === notifi.id);
    // if (index <= 0) return;
    // arr.splice(index, 1);
    // notificationContext.setNotification(arr);
    setLoading(false);
  };

  const handleRemoveAllNotification = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const removeNotificationData = await RemoveAllNotification();
    // if (!removeNotificationData.status) {
    //   setError(removeNotificationData.message);
    //   setLoading(false);
    //   return;
    // }
    // const populateNotificationData = await GetAllNotification();
    // if (!populateNotificationData.status) {
    //   setError(populateNotificationData.message);
    //   setLoading(false);
    //   return;
    // }
    // notificationContext.setNotification(populateNotificationData.content);
    setLoading(false);
  };

  if (loading) return <Loading />;
  //   if (!notificationContext.notification)
  //     return (
  //       <Card className="card">
  //         <CardHeader className="card-header" title="Powiadomienia" />
  //         <CardContent className="card-content">Brak powiadomień</CardContent>
  //       </Card>
  //     );
  return (
    <Card className="card-profile">
      <CardHeader
        className="card-header-profile"
        title={
          <div className="flex-row flex-space-between flex-center">
            <Typography variant="h5">Powiadomienia</Typography>
            <div>
              {notificationContext.notification && (
                <IconButton onClick={handleRemoveAllNotification}>
                  <CiCircleRemove />
                </IconButton>
              )}
            </div>
          </div>
        }
      />
      <CardContent className="card-content-profile">
        <List>
          {notificationContext.notification &&
            notificationContext.notification.map((notifi) => (
              <>
                {/* dokonczyc gdy api <ListItem key={notifi.id}>Cd</ListItem> */}
                <ListItem>
                  <div className="flex-row flex-space-between flex-center full-width">
                    <div>Name of notifi and link to event</div>
                    <div>
                      <IconButton
                        onClick={(e) => {
                          handleRemoveNotification(e, notifi);
                        }}
                      >
                        <CiCircleRemove />
                      </IconButton>
                    </div>
                  </div>
                </ListItem>
                <div>
                  <Divider
                    style={{
                      marginBottom: "1rem",
                      paddingBottom: "1rem",
                    }}
                  />
                </div>
              </>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};
export default ProfileNotification;

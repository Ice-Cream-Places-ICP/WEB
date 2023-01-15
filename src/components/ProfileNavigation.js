import { Badge, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Stack } from "@mui/system";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../context/NotificationContext";

const ProfileNavigation = () => {
  const isMobile = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const notificationContext = useNotification();

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <List
      component={Stack}
      direction={isMobile.getIsMobile() ? "column" : "row"}
      style={{ paddingBottom: 0 }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(0)}
        component={Link}
        to="view"
      >
        <ListItemText primary="Przeglądaj" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(1)}
        component={Link}
        to="edit"
      >
        <ListItemText primary="Edytuj" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(2)}
        component={Link}
        to="favorite"
      >
        <ListItemText primary="Ulubione" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => handleListItemClick(4)}
        component={Link}
        to="notification"
      >
        <ListItemText
          primary={
            <Badge
              badgeContent={
                notificationContext.notification &&
                notificationContext.notification.length
              }
              color="secondary"
            >
              Powiadomienia
            </Badge>
          }
        />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(3)}
        component={Link}
        to="/shop"
      >
        <ListItemText primary="Lodziarnie" />
      </ListItemButton>
    </List>
  );
};

export default ProfileNavigation;

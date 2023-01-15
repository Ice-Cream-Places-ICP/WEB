import { Link } from "react-router-dom";

// MUI
import {
  Link as MuiLink,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

// Icons
import { CiIceCream, CiSearch } from "react-icons/ci";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { CheckIfLogin } from "../services/auth";
import { useNotification } from "../context/NotificationContext";

const Navbar = ({ links }) => {
  const userContext = useUser();
  const ThemeContext = useTheme();
  const notificationContext = useNotification();

  const [anchorEl, setAnchorEl] = useState();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color={ThemeContext.darkMode === "dark" ? "secondary" : "primary"}
    >
      <Toolbar>
        <div className="flex-row flex-center flex-space-between full-width">
          <div className="flex-row flex-center">
            <MuiLink color="text.secondary" component={Link} to="/">
              <Typography variant="h4" style={{ margin: "0.4rem" }}>
                <CiIceCream />
              </Typography>
            </MuiLink>
            <MuiLink color="text.secondary" component={Link} to="/search">
              <Typography variant="h5" style={{ margin: "0.4rem" }}>
                <CiSearch />
              </Typography>
            </MuiLink>
          </div>
          <div>
            <Button
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
            >
              <Badge
                badgeContent={
                  userContext.user && userContext.user.notifications.length
                }
                color="secondary"
              >
                <Avatar style={{ backgroundColor: "#6b6b6b" }}>
                  {userContext.user && userContext.user.email[0].toUpperCase()}
                </Avatar>
              </Badge>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {links.map((link, i) => (
                <MenuItem
                  key={i}
                  component={Link}
                  onClick={handleClose}
                  to={link.to}
                >
                  {link.label}
                </MenuItem>
              ))}
              <MenuItem>
                <FormGroup>
                  <Typography variant="body2">
                    <FormControlLabel
                      control={
                        <Switch
                          size="small"
                          onChange={async (e) => {
                            if (ThemeContext.darkMode === "dark") {
                              ThemeContext.setDarkMode("light");
                              if (await CheckIfLogin())
                                localStorage.setItem("darkMode", "light");
                              return;
                            }
                            if (await CheckIfLogin()) {
                              localStorage.setItem("darkMode", "dark");
                            }
                            ThemeContext.setDarkMode("dark");
                          }}
                          checked={ThemeContext.darkMode === "dark" && true}
                        />
                      }
                      label="Tryb ciemny"
                    />
                  </Typography>
                </FormGroup>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

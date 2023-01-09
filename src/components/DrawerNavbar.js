import { Link } from "react-router-dom";
import { useState } from "react";

// MUI
import {
  Link as MuiLink,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
} from "@mui/material";

// Icons
import { CiIceCream } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";

const DrawerNavbar = ({ links }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <Drawer
          open={openDrawer}
          onClose={() =>
            setOpenDrawer(() => {
              return false;
            })
          }
          anchor="right"
        >
          <div className="half-width">
            <List fullWidth>
              <ListItem>
                <Typography>
                  <MuiLink
                    color="text.secondary"
                    component={Link}
                    onClick={() =>
                      setOpenDrawer(() => {
                        return false;
                      })
                    }
                  >
                    <RiCloseFill />
                  </MuiLink>
                </Typography>
              </ListItem>
              {links.map((link, i) => (
                <ListItem key={i}>
                  <Typography>
                    <MuiLink
                      color="text.secondary"
                      component={Link}
                      to={link.to}
                      onClick={() =>
                        setOpenDrawer(() => {
                          return !openDrawer;
                        })
                      }
                    >
                      {link.label}
                    </MuiLink>
                  </Typography>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <div className="flex-row flex-space-between full-width">
          <Typography variant="h5">
            <MuiLink color="text.secondary" component={Link} to="/">
              <span>
                <CiIceCream />
              </span>
            </MuiLink>
          </Typography>
          <Typography variant="h5">
            <MuiLink
              color="text.secondary"
              component={Link}
              onClick={() =>
                setOpenDrawer(() => {
                  return !openDrawer;
                })
              }
            >
              <FiMenu />
            </MuiLink>
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default DrawerNavbar;

import { Link } from "react-router-dom";

// MUI
import {
  Link as MuiLink,
  AppBar,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";

// Icons
import { CiIceCream } from "react-icons/ci";

const Navbar = ({ links }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <div className="flex-row flex-space-beetwen full-width">
          <Typography variant="h5">
            <MuiLink color="text.secondary" component={Link} to="/">
              <span>
                <CiIceCream />
              </span>
            </MuiLink>
          </Typography>
          <Grid container gap={3}>
            {links.map((link, i) => (
              <Grid item key={i}>
                <Typography>
                  <MuiLink color="text.secondary" component={Link} to={link.to}>
                    {link.label}
                  </MuiLink>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

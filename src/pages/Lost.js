import { Link } from "react-router-dom";

// MUI
import { Typography, Link as MuiLink } from "@mui/material";

const Lost = () => {
  return (
    <Typography>
      Opssss... Chyba zabłądziłeś. Powróć do{" "}
      <MuiLink color="text.secondary" component={Link} to={"/"}>
        strony głównej
      </MuiLink>
    </Typography>
  );
};

export default Lost;

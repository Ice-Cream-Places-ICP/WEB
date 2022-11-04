// Hooks
import { useState, useEffect } from "react";

// Components
import ShopCard from "../components/ShopCard";

// MUI
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

// Services
import { getShops } from "../services/shopService";

const Home = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    let ignore = false;
    const data = async () => {
      const data = await getShops();
      if (!data || !data.status) {
        if (!ignore) {
          setShops(["Błąd pobierania danych"]);
        }
      }
      if (!ignore) {
        setShops(data.content);
      }
    };

    data();

    return () => (ignore = true);
  }, []);

  return (
    <div className="flex-column">
      {console.log(shops)}

      <Typography variant="h5" gutterBottom>
        Witaj na stronie poświęconej lodziarniom. Tutaj znajdziesz każdą
        lodziarnię w Twojej okolicy.
      </Typography>
      <Grid container>
        {shops.map((shop, i) =>
          i < 6 ? (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <ShopCard
                shop={shop}
                params={{ showFlavors: false, query: "" }}
              />
            </Grid>
          ) : (
            ""
          )
        )}
      </Grid>
    </div>
  );
};

export default Home;

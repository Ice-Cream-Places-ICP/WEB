// Hooks
import { useState, useEffect } from "react";

// Components
import ShopCard from "../components/ShopCard";

// MUI
import { Button, Grid, Typography } from "@mui/material";
import { GetShops } from "../services/shop";
import { ColorRing } from "react-loader-spinner";
import Loading from "../components/Loading";

// Services

const Home = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(false);

  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const compare = (a, b) => {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  };

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    setError("");
    const populateShops = async () => {
      const getShopsData = await GetShops();

      if (!getShopsData.status) {
        setError(getShopsData.message);
        setLoading(false);
        return;
      }

      const arr = getShopsData.content;
      // shuffle(arr);
      await arr.sort(compare);

      setShops(arr);
      setLoading(false);
    };

    setLoading(true);
    populateShops();
  }, []);

  if (loading) return <Loading />;
  if (!shops) return <Loading />;

  return (
    <div className="flex-column">
      <Typography variant="h5" gutterBottom>
        Witaj na stronie poświęconej lodziarniom. Tutaj znajdziesz każdą
        lodziarnię w Twojej okolicy.
      </Typography>
      {error && <div className="error">{error}</div>}
      <Grid container>
        {!showMore &&
          shops.map((shop, i) =>
            i < 6 ? (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <ShopCard shop={shop} params={{ showFlavors: false }} />
              </Grid>
            ) : (
              ""
            )
          )}
        {showMore &&
          shops.map((shop, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <ShopCard shop={shop} params={{ showFlavors: false }} />
            </Grid>
          ))}
      </Grid>

      {shops.length > 6 && (
        <Button
          fullWidth
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setShowMore(() => !showMore);
          }}
        >
          {!showMore && "Pokaż więcej"}
          {showMore && "Pokaż mniej"}
        </Button>
      )}
    </div>
  );
};

export default Home;

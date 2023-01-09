// Hooks
import { useState, useEffect } from "react";

// Components
import ShopCard from "../components/ShopCard";

// MUI
import {
  TextField,
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

// Services
import { GetShops } from "../services/shop";
import { ColorRing } from "react-loader-spinner";
import Loading from "../components/Loading";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [shopList, setShopList] = useState([]);
  const [error, setError] = useState("");
  const [filteredShop, setFilteredShop] = useState([]);
  const [query, setQuery] = useState("");

  const compare = (a, b) => {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    const populateShopList = async () => {
      const getShopsData = await GetShops();
      if (!getShopsData) {
        setError(getShopsData.message);
        setLoading(false);
        return;
      }

      const arr = getShopsData.content;
      await arr.sort(compare);
      setShopList(arr);
      setLoading(false);
    };

    setLoading(true);
    populateShopList();
  }, []);

  useEffect(() => {
    if (query === "") {
      setFilteredShop([]);
    } else {
      setFilteredShop(
        shopList.filter((shop) => {
          if (
            shop.name.toLowerCase().includes(query.toLowerCase()) ||
            shop.flavors.some((flavor) =>
              flavor.name.toLowerCase().includes(query.toLowerCase())
            )
          )
            return shop;
          return null;
        })
      );
    }
  }, [query]);

  if (loading) return <Loading />;
  if (!shopList) return <Loading />;

  return (
    <Card className="card">
      <CardHeader
        className="card-header"
        title="Wyszukaj lodziarnię po nazwie lub smaku :D."
      />
      <CardContent className="card-content">
        {error && <div className="error">{error}</div>}
        <div className="flex-column">
          <Typography variant="h5" gutterBottom></Typography>
          <TextField
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            label="Szukaj"
            fullWidth
          />
          <Grid container>
            {filteredShop.map((shop, i) => {
              return (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <ShopCard shop={shop} params={{ showFlavors: true }} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

export default Search;

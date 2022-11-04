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
import { getShops } from "../services/shopService";

const Search = () => {
  const [shopList, setShopList] = useState([]);
  const [filteredShop, setFilteredShop] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let ignore = false;
    const data = async () => {
      const data = await getShops();
      if (!data || !data.status) {
        if (!ignore) {
        }
      }
      if (!ignore) {
        setShopList(data.content);
      }
    };

    data();
    return () => (ignore = true);
  }, []);

  useEffect(() => {
    let ignore = false;
    if (query === "") {
      if (!ignore) setFilteredShop([]);
    } else {
      if (!ignore) {
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
    }

    return () => (ignore = true);
  }, [query]);

  return (
    <Card className="card">
      <CardHeader
        className="card-header"
        title="
        Wyszukaj lodziarnię po nazwie lub smaku :D."
      />
      <CardContent className="card-content">
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
                  <ShopCard
                    shop={shop}
                    params={{ showFlavors: true, query: query }}
                  />
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

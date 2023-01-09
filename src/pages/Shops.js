import { useEffect, useState } from "react";
import ShopCard from "../components/ShopCard";
import { useUser } from "../context/UserContext";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import { GetUser } from "../services/user";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Shops = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shops, setShops] = useState([]);
  const user = useUser();

  useEffect(() => {
    setError("");
    const populateShops = async () => {
      const userData = await GetUser();
      if (!userData.status) {
        setError(userData.message);
        setLoading(false);
        return;
      }

      user.setUser(await userData.content);
      setShops(await userData.content.shops);

      setLoading(false);
    };

    setLoading(true);
    populateShops();
  }, []);

  if (loading) return <Loading />;
  if (!shops) return <Loading />;
  if (!user.user) return <Loading />;

  return (
    <>
      <Card className="card">
        <CardHeader
          className="card-header"
          title={
            <div className="flex-row flex-space-between">
              <div>Twoje lodziarnie</div>
              <div>
                <IconButton color="primary" component={Link} to="/shop/add">
                  <AiOutlinePlus />
                </IconButton>
              </div>
            </div>
          }
        />
        {error && <div className="error">{error}</div>}
        {shops.length <= 0 && (
          <CardContent className="card-content">
            <Typography>Nie masz lodziarni</Typography>
          </CardContent>
        )}
      </Card>
      {shops.length > 0 && (
        <div className="flex-column">
          <Grid container>
            {shops.map((shop, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <ShopCard
                  shop={shop.id}
                  params={{ showFlavors: false, query: "" }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default Shops;

import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetShops } from "../services/shop";
import { ColorRing } from "react-loader-spinner";
import Loading from "./Loading";

const AdminShops = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shops, setShops] = useState([]);

  useEffect(() => {
    setError("");
    const populateShops = async () => {
      const getShopsData = await GetShops();
      if (!getShopsData.status) {
        setError(getShopsData.message);
        setLoading(false);
        return;
      }
      setShops(getShopsData.content);
      setLoading(false);
    };

    setLoading(true);
    populateShops();
  }, []);

  if (loading) return <Loading />;

  if (!shops) return <Loading />;

  return (
    <Card className="card">
      <CardHeader
        className="card-header"
        title={<Typography variant="h5">Lodziarnie</Typography>}
      />
      <CardContent className="card-content">
        {error && <div className="error">{error}</div>}
        {shops.map((shop) => (
          <div
            key={shop._id}
            style={{ borderBottom: "solid 1px black", padding: "10px 0" }}
          >
            <MuiLink component={Link} to={`/shop/${shop._id}`}>
              {shop._id}
              <br />
              <strong>{shop.name}</strong>
            </MuiLink>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminShops;

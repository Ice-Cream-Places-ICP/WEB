// Hooks
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardHeader,
  CardContent,
  Link as MuiLink,
  Button,
  Rating,
} from "@mui/material";

// Icons
import { CiIceCream } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { CiMapPin } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { GetShopById } from "../services/shop";
import Map from "../components/Map";
import { useUser } from "../context/UserContext";
import Reviews from "../components/Reviews";
import { GetUser } from "../services/user";
import Loading from "../components/Loading";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [shop, setShop] = useState(null);
  const params = useParams();
  const userContext = useUser();

  const daysNames = [
    { dayName: "Poniedziałek", dayNumber: 1 },
    { dayName: "Wtorek", dayNumber: 2 },
    { dayName: "Środa", dayNumber: 3 },
    { dayName: "Czwartek", dayNumber: 4 },
    { dayName: "Piątek", dayNumber: 5 },
    { dayName: "Sobota", dayNumber: 6 },
    { dayName: "Niedziela", dayNumber: 7 },
  ];

  const styleTime = (h, m) => {
    if (h <= 9) h = `0${h}`;
    if (m <= 9) m = `0${m}`;

    return `${h}:${m}`;
  };

  useEffect(() => {
    setError("");
    const populate = async (id) => {
      const getShopByIdData = await GetShopById(id);
      if (!getShopByIdData.status) {
        setError(getShopByIdData.message);
        setLoading(false);
        return;
      }

      const userData = await GetUser();
      if (!userData.status) {
        setError(userData.message);
        setLoading(false);
        return;
      }

      setShop(getShopByIdData.content);
      await userContext.setUser(userData.content);
      setLoading(false);
    };

    setLoading(true);
    populate(params.id);
  }, [params.id]);

  if (loading) return <Loading />;
  if (!userContext.user) return <Loading />;
  if (!shop) return <Loading />;
  return (
    <>
      <Card className="card">
        <CardHeader
          className="card-header"
          title={
            <div className="flex-space-between flex-row full-width">
              <div className="flex-row">
                <Typography variant="h4">
                  <CiIceCream />
                </Typography>
                <Typography variant="h5">{shop.name}</Typography>
                <Rating name="read-only" value={shop.rating} readOnly />
              </div>

              {userContext.user && (
                <div>
                  {(userContext.user.shops.filter(
                    (shop) => shop.id._id === params.id
                  ).length > 0 ||
                    userContext.user.roles.includes("admin")) && (
                    <>
                      <MuiLink
                        style={{ margin: "0 20px" }}
                        color="text.primary"
                        component={Link}
                        to={`/shop/${params.id}/edit`}
                      >
                        <span>
                          <CiEdit />
                        </span>
                      </MuiLink>
                      {(userContext.user.shops.filter(
                        (shop) =>
                          shop.id._id === params.id &&
                          shop.jobPosition === "owner"
                      ).length > 0 ||
                        userContext.user.roles.includes("admin")) && (
                        <MuiLink
                          color="text.primary"
                          component={Link}
                          to={`/shop/${params.id}/delete`}
                        >
                          <span>
                            <CiTrash />
                          </span>
                        </MuiLink>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          }
          subheader={
            <div className="flex-row">
              <Typography variant="h4">
                <CiMapPin />
              </Typography>
              <Typography variant="h6">
                {shop.address.streetName} {shop.address.streetNumber},{" "}
                {shop.address.postCode} {shop.address.city},{" "}
                {shop.address.country}
              </Typography>
            </div>
          }
        />
        <CardContent className="card-content">
          {error && <div className="error">{error}</div>}
          <div className="flex-column">
            {showMap && <Map mapData={shop.address} pinDraggable={false} />}
            <Button
              fullWidth
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setShowMap(() => !showMap);
              }}
            >
              {!showMap ? "Pokaż na mapie" : "Zamknij mapę"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="card">
        <CardHeader className="card-header" title="Godziny otwarcia" />
        <CardContent className="card-content">
          <Grid container>
            {daysNames.map((day, i) => {
              const match = shop.openingHours.filter((openHours) => {
                if (openHours.weekDay === day.dayNumber) {
                  return openHours;
                } else return null;
              });

              if (match[0]) {
                return (
                  <Grid key={i} item xs={12}>
                    <div className="flex-row">
                      <Typography style={{ width: "12ch" }}>
                        <strong>{day.dayName}</strong>
                      </Typography>
                      <Typography>
                        {styleTime(match[0].startHour, match[0].startMinute)}
                      </Typography>
                      <Typography>
                        {styleTime(match[0].endHour, match[0].endMinute)}
                      </Typography>
                    </div>
                  </Grid>
                );
              } else {
                return (
                  <Grid key={i} item xs={12}>
                    <div className="flex-row">
                      <Typography style={{ width: "12ch" }}>
                        <strong>{day.dayName}</strong>
                      </Typography>
                      <Typography>Nieczynne</Typography>
                    </div>
                  </Grid>
                );
              }
            })}
          </Grid>
        </CardContent>
      </Card>
      <Card className="card">
        <CardHeader className="card-header" title="Smaki do wyboru" />
        <CardContent className="card-content">
          <Grid container>
            {shop.flavors.map((flavor, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <FormGroup key={i}>
                  <FormControlLabel
                    disabled
                    control={<Checkbox defaultChecked={flavor.available} />}
                    label={flavor.name}
                  />
                </FormGroup>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Reviews reviews={shop.reviews} shopId={params.id} setShop={setShop} />
    </>
  );
};

export default Shop;

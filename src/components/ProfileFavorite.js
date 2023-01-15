import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FavoriteShop, GetShopById } from "../services/shop";
import Loading from "./Loading";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { GetUser } from "../services/user";

const ProfileFavorite = () => {
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const userContext = useUser();

  const handleRemoveFavorite = async (shopId) => {
    setLoading(true);

    const favoriteData = await FavoriteShop(shopId);
    if (!favoriteData.status) {
      setLoading(false);
      return;
    }

    const userData = await GetUser();
    if (!userData.status) {
      setLoading(false);
      return;
    }
    await userContext.setUser(userData.content);
    setLoading(false);
  };

  useEffect(() => {
    const populateShops = async () => {
      for (let i = 0; i < userContext.user.favoriteShops.length; i++) {
        let shopData = await GetShopById(userContext.user.favoriteShops[i]);
        if (shopData.status)
          if (!shops.some((s) => s.id === shopData.content._id)) {
            setShops([
              ...shops,
              {
                id: shopData.content._id,
                name: shopData.content.name,
                address: {
                  city: shopData.content.address.city,
                  streetName: shopData.content.address.streetName,
                  streetNumber: shopData.content.address.streetNumber,
                },
              },
            ]);
          }
        //
      }
      setLoading(false);
    };
    setLoading(true);
    populateShops();
  }, [userContext.user]);

  if (loading) return <Loading />;

  return (
    <Card className="card-profile">
      <CardHeader className="card-header-profile" title="Ulubione lodziarnie" />
      <CardContent className="card-content-profile">
        <List>
          {userContext.user &&
            (userContext.user.favoriteShops.length <= 0 ? (
              <Typography variant="body1">Brak ulubionych lodziarni</Typography>
            ) : (
              shops.map((shop) => (
                <div key={shop.id}>
                  <ListItem>
                    <div className="flex-row full-width flex-space-between flex-center">
                      <MuiLink component={Link} to={`/shop/${shop.id}`}>
                        <strong>{shop.name}</strong>
                        <br />
                        {shop.address.city} {shop.address.streetName}{" "}
                        {shop.address.streetNumber}
                      </MuiLink>
                      <div>
                        <IconButton
                          color="error"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveFavorite(shop.id);
                          }}
                        >
                          <IoHeartDislikeOutline />
                        </IconButton>
                      </div>
                    </div>
                  </ListItem>
                  <div>
                    <Divider
                      style={{
                        marginBottom: "1rem",
                        paddingBottom: "1rem",
                      }}
                    />
                  </div>
                </div>
              ))
            ))}
        </List>
      </CardContent>
    </Card>
  );
};
export default ProfileFavorite;

import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";

// Components
import ShopAddForm from "../components/forms/ShopAddForm";

// MUI
import { Link as MuiLink } from "@mui/material";

// Services
import { createShop } from "../services/shopService";

const ShopAdd = () => {
  const [createShopOk, setCreateShopOk] = useState(null);

  const handleSubmit = async (name, address, flavors) => {
    const res = await createShop(name, address, flavors);
    if (res.status === 200) {
      setCreateShopOk(res.data.content);
    }
  };

  if (createShopOk) {
    return (
      <div>
        Lodziarnia dodana prawidłowo{" "}
        <MuiLink
          component={Link}
          color="text.primary"
          to={`/shop/${createShopOk._id}`}
        >
          pokaż lodziarnię
        </MuiLink>
      </div>
    );
  }
  return <ShopAddForm handleSubmit={handleSubmit} />;
};

export default ShopAdd;

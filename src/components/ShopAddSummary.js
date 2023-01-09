import { Button, Card, CardHeader, CardContent } from "@mui/material";
import Map from "./Map";

import ShopCard from "./ShopCard";

const ShopAddSummary = ({
  step,
  setStep,
  formData,
  styleTime,
  error,
  setError,
  handleCreateShop,
}) => {
  return (
    <Card className="card">
      <CardHeader className="card-header" title="Podsumowanie" />
      <CardContent className="card-content">
        <div className="error flex-row">{error}</div>
        <ShopCard
          shop={formData}
          styleTime={styleTime}
          params={{ showFlavors: true, showOpenHours: true, isSummary: true }}
        />
        <Map mapData={formData.address} />
        <div className="flex-row">
          <Button
            fullWidth
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setError("");
              setStep(step - 1);
            }}
          >
            Wstecz
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setError("");
              handleCreateShop();
            }}
          >
            Dodaj
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopAddSummary;

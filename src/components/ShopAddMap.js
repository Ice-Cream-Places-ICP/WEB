import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import Map from "./Map";

const ShopAddMap = ({ step, setStep, formData, setFormData }) => {
  const [coordinatesFromPin, setCoordinatesFromPin] = useState({
    lng: null,
    lat: null,
  });

  const [mapLoad, setMapLoad] = useState(true);

  useEffect(() => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        location: {
          ...formData.address.location,
          coordinates: [coordinatesFromPin.lng, coordinatesFromPin.lat],
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinatesFromPin]);

  return (
    <Card className="card">
      <CardHeader className="card-header" title="Lodziarnia na mapie" />
      <CardContent className="card-content">
        <Map
          mapData={formData.address}
          pinDraggable={true}
          setCoordinatesFromPin={setCoordinatesFromPin}
          setMapLoad={setMapLoad}
        />
        <div className="flex-column">
          <div className="flex-row">
            <Button
              fullWidth
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setStep(step - 1);
              }}
            >
              Wstecz
            </Button>
            <Button
              disabled={mapLoad}
              fullWidth
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setStep(step + 1);
              }}
            >
              Dalej
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopAddMap;

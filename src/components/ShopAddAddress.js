import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import Map from "./Map";

const ShopAddAddress = ({ step, setStep, formData, setFormData }) => {
  return (
    <Card className="card">
      <CardHeader className="card-header" title="Adres lodziarni" />
      <CardContent className="card-content">
        <div className="flex-column">
          <TextField
            fullWidth
            type="text"
            id="country"
            label="Państwo"
            value={formData.address.country}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  country: e.target.value,
                },
              });
            }}
          />

          <TextField
            fullWidth
            type="text"
            id="postCode"
            label="Kod pocztowy"
            value={formData.address.postCode}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  postCode: e.target.value,
                },
              });
            }}
          />

          <TextField
            fullWidth
            type="text"
            id="city"
            label="Miasto"
            value={formData.address.city}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  city: e.target.value,
                },
              });
            }}
          />

          <TextField
            fullWidth
            type="text"
            id="streetName"
            label="Ulica"
            value={formData.address.streetName}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  streetName: e.target.value,
                },
              });
            }}
          />

          <TextField
            fullWidth
            type="text"
            id="streetNumber"
            label="Numer domu"
            value={formData.address.streetNumber}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  streetNumber: e.target.value,
                },
              });
            }}
          />

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
              disabled={
                !formData.address.country ||
                !formData.address.city ||
                !formData.address.postCode ||
                !formData.address.streetName ||
                !formData.address.streetNumber
              }
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

export default ShopAddAddress;

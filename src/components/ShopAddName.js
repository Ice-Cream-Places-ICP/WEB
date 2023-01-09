import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
} from "@mui/material";

const ShopAddName = ({ step, setStep, formData, setFormData }) => {
  return (
    <Card className="card">
      <CardHeader className="card-header" title="Nazwa lodziarni" />
      <CardContent className="card-content">
        <div className="flex-column">
          <TextField
            fullWidth
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
            }}
          />

          <Button
            disabled={!formData.name}
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
      </CardContent>
    </Card>
  );
};

export default ShopAddName;

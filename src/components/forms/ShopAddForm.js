// Hooks
import { useRef, useState } from "react";

// MUI
import {
  TextField,
  Button,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Card,
  Checkbox,
  CardContent,
  FormGroup,
  CardHeader,
  Grid,
} from "@mui/material";

const ShopAddForm = ({ handleSubmit }) => {
  const [flavors, setFlavors] = useState([]);
  const [nameHelperText, setNameHelperText] = useState(
    "Twoja lodziarnia musi posiadać nazwę"
  );
  const [addressHelperText, setAddressHelperText] = useState(
    "Twoja lodziarnia musi posiadać adres"
  );

  const name = useRef(null);
  const address = useRef(null);

  const flavorsData = [
    "Ananasowe",
    "Arbuzowe",
    "Bananowe",
    "Brzoskwiniowe",
    "Cytrynowe",
    "Czarna porzeczka",
    "Czekolada gorzka",
    "Czekolada z chili",
    "Czekoladowe",
    "Gelatist",
    "Grejpfrut",
    "Gruszka z cynamonem",
    "Jabłko – Mięta",
    "Jagodowe",
    "Jogurtowe",
    "Kawowe",
    "Kinder Bueno",
    "Kiwi",
    "Malaga",
    "Malinowe",
    "Mandarynka",
    "Mango",
    "Marakuja",
    "Masło palone",
    "Miętowe",
    "Nutella",
    "Oreo",
    "Orzech włoski",
    "Owoce lasu",
    "Paradiso",
    "Pistacjowe",
    "Pomarańczowe",
    "Rafaello",
    "Ricotta z gruszką",
    "Sernikowe",
    "Słony karmel",
    "Smaki Sycylii",
    "Snickers",
    "Stracciatella",
    "Śliwkowe",
    "Śmietankowe",
    "Tiramisu",
    "Truskawkowe",
    "Waniliowe",
    "Zabajone",
    "Zielone jabłko",
  ];

  const handleNameChange = (e) => {
    if (e.target.value === "") {
      setNameHelperText("Twoja lodziarnia musi posiadać nazwę");
      return;
    }
    setNameHelperText("");
  };

  const handleAddressChange = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setAddressHelperText("Twoja lodziarnia musi posiadać adres");
      return;
    }
    setAddressHelperText("");
  };

  const handleFlavorsChange = (e) => {
    if (!flavors.includes(e.target.value)) {
      setFlavors((prev) => [...prev, e.target.value]);
    } else {
      setFlavors((prev) => prev.filter((p) => p !== e.target.value));
    }
  };

  return (
    <Card className="max-width" elevation={0}>
      <CardHeader title="Dodaj swoją lodziarnię" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(name.current.value, address.current.value, flavors);
        }}
      >
        <CardContent className="flex-col flex-gap-2">
          <FormControl error={nameHelperText !== ""}>
            <TextField
              onChange={(e) => {
                handleNameChange(e);
              }}
              inputRef={name}
              type="text"
              id="name"
              label="Nazwa"
              error={nameHelperText !== ""}
            />
            <FormHelperText>{nameHelperText}</FormHelperText>
          </FormControl>

          <FormControl error={addressHelperText !== ""}>
            <TextField
              onChange={(e) => {
                handleAddressChange(e);
              }}
              inputRef={address}
              type="text"
              id="address"
              label="Adres"
              error={addressHelperText !== ""}
            />
            <FormHelperText>{addressHelperText}</FormHelperText>
          </FormControl>

          <FormControl>
            <FormGroup>
              <Grid
                container
                gap={3}
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                {flavorsData.map((f) => (
                  <Grid key={f} item xs={12} sm={6} md={4} lg={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={f}
                          onChange={(e) => handleFlavorsChange(e)}
                        />
                      }
                      label={f}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            disabled={nameHelperText !== "" || addressHelperText !== ""}
          >
            Dodaj lodziarnię
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default ShopAddForm;
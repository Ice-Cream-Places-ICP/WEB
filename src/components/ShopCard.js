import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";

// MUI
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link as MuiLink,
  Grid,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Rating,
} from "@mui/material";

// Icons
import { CiMapPin } from "react-icons/ci";

const ShopCard = ({ shop, params }) => {
  const { name, address, openingHours, flavors, _id, rating } = shop;
  const { country, city, postCode, streetName, streetNumber } = address;
  const { weekDay, startHour, startMinute, endHour, endMinute } = openingHours;
  const { showFlavors, showOpenHours, isSummary } = params;

  //const [filteredFlavors, setFilteredFlavors] = useState([]);

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

  return (
    <Card elevation={0} className="card">
      <MuiLink
        component={Link}
        to={`/shop/${_id}`}
        style={{ textDecoration: "none" }}
      >
        <CardHeader
          className="card-header"
          title={
            <div className="flex-row flex-space-between">
              <strong>{name}</strong>
              <Rating name="read-only" value={rating} readOnly />
            </div>
          }
        />
        <CardContent className="card-content" color="secondary">
          <Typography type="h5">
            <span>
              <CiMapPin />
            </span>{" "}
            {streetName} {streetNumber}, {postCode} {city}, {country}
          </Typography>
          {showOpenHours && (
            <>
              <br />
              <Typography>
                <strong>Godziny otwarcia</strong>
              </Typography>
              <Grid container>
                {daysNames.map((day, i) => {
                  const match = openingHours.filter((openHours) => {
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
                            {styleTime(
                              match[0].startHour,
                              match[0].startMinute
                            )}
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
            </>
          )}
          {showFlavors && (
            <>
              <br />
              <Typography>
                <strong>Lista smaków</strong>
              </Typography>
              <Grid container>
                {flavors.map((flavor, i) => (
                  <Grid key={i} item>
                    <FormGroup>
                      <FormControlLabel
                        disabled
                        control={<Checkbox defaultChecked={flavor.available} />}
                        label={flavor.name}
                      />
                    </FormGroup>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </CardContent>
      </MuiLink>
    </Card>
  );
};

export default ShopCard;

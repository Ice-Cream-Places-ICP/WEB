import {
  FormControlLabel,
  Switch,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

const ShopAddSelectHours = ({
  dayName,
  dayNumber,
  addDaysData,
  removeDaysData,
  updateDaysData,
  getValue,
  menuItems,
  formData,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (formData.openingHours.find((item) => item.weekDay === dayNumber))
      setChecked(true);
    else setChecked(false);
  }, [formData.openingHours]);
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            id={`${dayName}Open`}
            onChange={(e) => {
              if (e.target.checked) {
                addDaysData(dayNumber);
              }
              if (!e.target.checked) {
                removeDaysData(dayNumber);
              }
            }}
          />
        }
        label={dayName}
      />

      {formData.openingHours.find((item) => item.weekDay === dayNumber) && (
        <div className="flex-row">
          <FormControl fullWidth>
            <InputLabel id={`${dayName}OpenLabel`}>Otwarcie</InputLabel>
            <Select
              labelId={`${dayName}OpenLabel`}
              id={`${dayName}Open`}
              label="Otwarcie"
              value={getValue("open", dayNumber)}
              name="open"
              onChange={(e) => {
                updateDaysData(e, dayNumber);
              }}
            >
              {menuItems.map((item) => item)}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id={`${dayName}CloseLabel`}>Zamknięcie</InputLabel>
            <Select
              labelId={`${dayName}CloseLabel`}
              id={`${dayName}Close`}
              label="Zamknięcie"
              value={getValue("close", dayNumber)}
              name="close"
              onChange={(e) => {
                updateDaysData(e, dayNumber);
              }}
            >
              {menuItems.map((item) => item)}
            </Select>
          </FormControl>
        </div>
      )}
    </>
  );
};

export default ShopAddSelectHours;

import { Card, CardHeader, CardContent, Button, MenuItem } from "@mui/material";
import ShopAddSelectHours from "./ShopAddSelectHours";

const ShopAddOpeningHours = ({
  step,
  setStep,
  formData,
  setFormData,
  styleTime,
}) => {
  const addDaysData = (dayNumber) => {
    setFormData({
      ...formData,
      openingHours: [
        ...formData.openingHours,
        {
          weekDay: dayNumber,
          startHour: 0,
          startMinute: 0,
          endHour: 0,
          endMinute: 0,
        },
      ],
    });
  };

  const updateDaysData = (e, dayNumber) => {
    const dayData = formData.openingHours.find(
      (item) => item.weekDay === dayNumber
    );

    if (dayData) {
      const time = e.target.value.split(":");
      if (e.target.name === "open") {
        dayData.startHour = parseInt(time[0]);
        dayData.startMinute = parseInt(time[1]);
      }
      if (e.target.name === "close") {
        dayData.endHour = parseInt(time[0]);
        dayData.endMinute = parseInt(time[1]);
      }

      const index = formData.openingHours.findIndex(
        (item) => item.weekDay === dayNumber
      );

      const array = formData.openingHours;
      array[index] = dayData;
      setFormData({
        ...formData,
        openingHours: array,
      });
    }
  };

  const removeDaysData = (dayNumber) => {
    const newOpeningHours = formData.openingHours.filter((item) => {
      if (item.weekDay !== dayNumber) return item;
    });

    setFormData({
      ...formData,
      openingHours: newOpeningHours,
    });
  };

  const getValue = (state, dayNumber) => {
    const h = formData.openingHours.find((item) => item.weekDay === dayNumber);
    if (h) {
      if (state === "open") {
        return styleTime(h.startHour, h.startMinute);
      }
      if (state === "close") {
        return styleTime(h.endHour, h.endMinute);
      }
    }
    return;
  };

  const populateMenuItems = () => {
    const items = [];
    for (let i = 0; i <= 23; i++) {
      for (let j = 0; j <= 30; j += 30) {
        items.push(
          <MenuItem key={styleTime(i, j)} value={styleTime(i, j)}>
            {styleTime(i, j)}
          </MenuItem>
        );
      }
    }
    return items;
  };

  const menuItems = populateMenuItems();

  return (
    <Card className="card">
      <CardHeader className="card-header" title="Godziny otwarcia" />
      <CardContent className="card-content">
        <div className="flex-column">
          <ShopAddSelectHours
            dayName="Poniedziałek"
            dayNumber={1}
            addDaysData={addDaysData}
            removeDaysData={removeDaysData}
            updateDaysData={updateDaysData}
            getValue={getValue}
            menuItems={menuItems}
            formData={formData}
          />
          <ShopAddSelectHours
            dayName="Wtorek"
            dayNumber={2}
            addDaysData={addDaysData}
            removeDaysData={removeDaysData}
            updateDaysData={updateDaysData}
            getValue={getValue}
            menuItems={menuItems}
            formData={formData}
          />
          <ShopAddSelectHours
            dayName="Środa"
            dayNumber={3}
            addDaysData={addDaysData}
            removeDaysData={removeDaysData}
            updateDaysData={updateDaysData}
            getValue={getValue}
            menuItems={menuItems}
            formData={formData}
          />
          <ShopAddSelectHours
            dayName="Czwartek"
            dayNumber={4}
            addDaysData={addDaysData}
            removeDaysData={removeDaysData}
            updateDaysData={updateDaysData}
            getValue={getValue}
            menuItems={menuItems}
            formData={formData}
          />
          <ShopAddSelectHours
            dayName="Piątek"
            dayNumber={5}
            addDaysData={addDaysData}
            removeDaysData={removeDaysData}
            updateDaysData={updateDaysData}
            getValue={getValue}
            menuItems={menuItems}
            formData={formData}
          />
          <ShopAddSelectHours
            dayName="Sobota"
            dayNumber={6}
            addDaysData={addDaysData}
            removeDaysData={removeDaysData}
            updateDaysData={updateDaysData}
            getValue={getValue}
            menuItems={menuItems}
            formData={formData}
          />
          <ShopAddSelectHours
            dayName="Niedziela"
            dayNumber={7}
            addDaysData={addDaysData}
            removeDaysData={removeDaysData}
            updateDaysData={updateDaysData}
            getValue={getValue}
            menuItems={menuItems}
            formData={formData}
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

export default ShopAddOpeningHours;

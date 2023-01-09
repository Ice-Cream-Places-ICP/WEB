import {
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import ShopAddInputFlavor from "./ShopAddInputFlavor";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ShopAddFlavors = ({ step, setStep, formData, setFormData }) => {
  const [plusDisable, setPlusDisable] = useState(false);
  const [minusDisable, setMinusDisable] = useState(true);
  const [disableButton, setDisableButton] = useState(true);

  const handleAddInput = () => {
    setFormData({
      ...formData,
      flavors: [
        ...formData.flavors,
        {
          name: "",
          available: true,
        },
      ],
    });
  };

  const handleRemoveInput = () => {
    const arr = [...formData.flavors];
    arr.pop();
    setFormData({
      ...formData,
      flavors: arr,
    });
  };

  useEffect(() => {
    const flavLenght = formData.flavors.length;
    if (flavLenght < 1) setMinusDisable(true);
    else if (flavLenght >= 1) setMinusDisable(false);

    if (flavLenght > 19) setPlusDisable(true);
    if (flavLenght <= 19) setPlusDisable(false);

    formData.flavors.map((flav) => {
      if (!flav.name) {
        setDisableButton(true);
        return;
      } else setDisableButton(false);
    });
  }, [formData.flavors]);

  return (
    <Card className="card">
      <CardHeader className="card-header" title="Smaki" />
      <CardContent className="card-content">
        <div className="flex-column">
          <div>
            {formData.flavors.map((input, i) => {
              return (
                <div key={i} className="flex-row" style={{ padding: "5px 0" }}>
                  <div
                    className="flex-center flex-row"
                    style={{ width: "30px" }}
                  >
                    {i + 1}
                  </div>
                  <ShopAddInputFlavor
                    formData={formData}
                    setFormData={setFormData}
                    index={i}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex-row flex-space-between">
            <div></div>
            <div>
              <IconButton
                color="primary"
                disabled={minusDisable}
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveInput();
                }}
              >
                <AiOutlineMinus />
              </IconButton>
              <IconButton
                color="primary"
                disabled={plusDisable}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddInput();
                }}
              >
                <AiOutlinePlus />
              </IconButton>
            </div>
          </div>
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
              disabled={disableButton}
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

export default ShopAddFlavors;

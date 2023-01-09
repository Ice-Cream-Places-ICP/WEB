import { TextField } from "@mui/material";
import { useState } from "react";

const ShopAddInputFlavor = ({ formData, setFormData, index }) => {
  const [inputValue, setInputValue] = useState(() => {
    const arr = [...formData.flavors];
    return arr[index].name;
  });

  return (
    <TextField
      fullWidth
      type="text"
      id="name"
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        const arr = [...formData.flavors];
        arr[index].name = e.target.value;
        setFormData({
          ...formData,
          flavors: arr,
        });
      }}
    />
  );
};

export default ShopAddInputFlavor;

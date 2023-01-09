import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ShopAddAddress from "../components/ShopAddAddress";
import ShopAddFlavors from "../components/ShopAddFlavors";
import ShopAddMap from "../components/ShopAddMap";
import ShopAddName from "../components/ShopAddName";
import ShopAddOpeningHours from "../components/ShopAddOpeningHours";
import ShopAddSummary from "../components/ShopAddSummary";
import { useUser } from "../context/UserContext";
import { CreateShop } from "../services/shop";
import { GetUser } from "../services/user";

const AddShop = () => {
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: {
      country: "",
      city: "",
      postCode: "",
      streetName: "",
      streetNumber: "",
      location: {
        coordinates: [],
      },
    },
    openingHours: [],
    flavors: [],
    employees: [],
  });

  const styleTime = (h, m) => {
    if (h <= 9) h = `0${h}`;
    if (m <= 9) m = `0${m}`;

    return `${h}:${m}`;
  };

  const handleCreateShop = async () => {
    setLoading(true);
    const createShopData = await CreateShop(formData);
    if (!createShopData.status) {
      setError(createShopData.message);
      setLoading(false);
      return;
    }

    const userData = await GetUser();
    if (!userData.status) {
      setError(userData.message);
      setLoading(false);
      return;
    }

    user.setUser(await userData.content);

    navigate(`/shop/${createShopData.content._id}`);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  if (loading) return <Loading />;

  switch (step) {
    case 1: {
      return (
        <ShopAddName
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        />
      );
      break;
    }
    case 2: {
      return (
        <ShopAddAddress
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        />
      );
      break;
    }
    case 3: {
      return (
        <ShopAddMap
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        />
      );
      break;
    }
    case 4: {
      return (
        <ShopAddOpeningHours
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
          styleTime={styleTime}
        />
      );
      break;
    }
    case 5: {
      return (
        <ShopAddFlavors
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
          styleTime={styleTime}
        />
      );
      break;
    }
    case 6: {
      return (
        <>
          <ShopAddSummary
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            styleTime={styleTime}
            error={error}
            setError={setError}
            handleCreateShop={handleCreateShop}
          />
        </>
      );
      break;
    }
    default: {
      return "default";
      break;
    }
  }
};

export default AddShop;

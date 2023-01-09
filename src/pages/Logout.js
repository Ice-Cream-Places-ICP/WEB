import { Logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import Loading from "../components/Loading";

const Logouts = () => {
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    user.deleteUser();
    Logout();
    navigate("/");
  });

  if (loading) return <Loading />;
  return <div>Wylogowany</div>;
};

export default Logouts;

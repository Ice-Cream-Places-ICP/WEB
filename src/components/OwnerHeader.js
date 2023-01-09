import DrawerNavbar from "./DrawerNavbar";
import Navbar from "./Navbar";

// Context
import { useTheme } from "../context/ThemeContext";

const links = [
  {
    to: "/search",
    label: "Szukaj",
  },
  {
    to: "/shop",
    label: "Twoje lodziarnie",
  },
  {
    to: "/profile/view",
    label: "Profil",
  },
  {
    to: "/logout",
    label: "Wyloguj",
  },
];

const OwnerHeader = () => {
  const isMobile = useTheme();

  if (!isMobile.getIsMobile()) return <Navbar links={links} />;
  return <DrawerNavbar links={links} />;
};

export default OwnerHeader;

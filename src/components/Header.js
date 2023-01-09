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
    to: "/login",
    label: "Zaloguj",
  },
  {
    to: "/register",
    label: "Zarejestruj",
  },
];

const Header = () => {
  const isMobile = useTheme();

  if (!isMobile.getIsMobile()) return <Navbar links={links} />;
  return <DrawerNavbar links={links} />;
};

export default Header;

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
    to: "/profile/view",
    label: "Profil",
  },
  {
    to: "/admin/shops",
    label: "Panel administratora",
  },
  {
    to: "/logout",
    label: "Wyloguj",
  },
];

const AdminHeader = () => {
  const isMobile = useTheme();

  if (!isMobile.getIsMobile()) return <Navbar links={links} />;
  return <DrawerNavbar links={links} />;
};

export default AdminHeader;

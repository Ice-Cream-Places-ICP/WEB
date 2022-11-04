// Hooks
import { useUserContext } from "../hooks/useUserContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useEffect, useState } from "react";

// Components
import Navbar from "./Navbar";
import DrawerNavbar from "./DrawerNavbar";

const Header = () => {
  const { user } = useUserContext();
  const { global } = useGlobalContext();
  const [navbarLinksByUser, setNavbarLinksByUser] = useState([]);

  useEffect(() => {
    let ignore = false;

    const navbarLinks = [
      {
        to: "/search",
        label: "Szukaj",
        type: ["default", "user", "owner", "admin"],
      },
      {
        to: "/profile",
        label: "Profil",
        type: ["user", "owner", "admin"],
      },
      {
        to: "/shop",
        label: "Lodziarnia",
        type: ["owner"],
      },
      {
        to: "/admin",
        label: "Admin panel",
        type: ["admin"],
      },
      {
        to: "/login",
        label: "Zaloguj",
        type: ["default"],
      },
      {
        to: "/register",
        label: "Zarejestruj",
        type: ["default"],
      },
      {
        to: "/logout",
        label: "Wyloguj",
        type: ["user", "owner", "admin"],
      },
    ];

    if (!ignore) {
      setNavbarLinksByUser(
        navbarLinks.filter((navbarLink) => {
          if (navbarLink.type.includes(user.type)) return navbarLink;
          return null;
        })
      );
    }

    return () => {
      ignore = true;
    };
  }, [user.type]);

  if (global.isMobile) return <DrawerNavbar navbarData={navbarLinksByUser} />;
  return <Navbar navbarData={navbarLinksByUser} />;
};

export default Header;

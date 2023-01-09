import { BrowserRouter, Route, Routes } from "react-router-dom";
// Hooks
import {
  Container,
  useMediaQuery,
  useTheme as useThemeMUI,
} from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "./context/ThemeContext";

// Components
import Header from "./components/Header";
import UserHeader from "./components/UserHeader";
import OwnerHeader from "./components/OwnerHeader";
import AdminHeader from "./components/AdminHeader";
import Logins from "./pages/Login";
import NotLoginPermission from "./permission/NotLoginPermission";
import UserPermission from "./permission/UserPermission";
import OwnerPermission from "./permission/OwnerPermission";
import AdminPermission from "./permission/AdminPermission";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Logouts from "./pages/Logout";
import Search from "./pages/Search";
import { CheckIfLogin } from "./services/auth";
import { useUser } from "./context/UserContext";
import { GetUser } from "./services/user";
import Registers from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileFavorite from "./components/ProfileFavorite";
import ProfileEdit from "./components/ProfileEdit";
import ProfileView from "./components/ProfileView";
import Shops from "./pages/Shops";
import Admin from "./pages/Admin";
import AdminUsers from "./components/AdminUsers";
import AdminShops from "./components/AdminShops";
import AddShop from "./pages/AddShop";
import EditShop from "./pages/EditShop";
import DeleteShop from "./pages/DeleteShop";
import Lost from "./pages/Lost";
import Protected from "./permission/Protected";
import ConfirmEmail from "./pages/ConfirmEmail";

// Pages

const App = () => {
  const user = useUser();
  const theme = useThemeMUI();
  const setIsMobile = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsMobile.setIsMobile(isMobile);
  }, [isMobile]);

  useEffect(() => {
    const populateUser = async () => {
      if (CheckIfLogin()) {
        const userData = await GetUser();
        user.setUser(await userData.content);
      }
    };

    populateUser();
  }, []);

  // if (user.user.roles.includes("admin"))
  //   return (
  //     <div>
  //       {" "}
  //       <Routes>
  //         <Route exact path="/" element={<Home />} />
  //         <Route path="/login" element={<Logins />} />
  //         <Route path="/shop/:id" element={<Shop />} />
  //         <Route path="/shop/:id/edit" element={<EditShop />} />
  //         <Route path="/shop/:id/delete" element={<DeleteShop />} />
  //         <Route path="/logout" element={<Logouts />} />
  //         <Route path="/search" element={<Search />} />
  //         <Route path="/register" element={<Registers />} />
  //         <Route path="/profile" element={<Profile />}>
  //           <Route path="view" element={<ProfileView />} />
  //           <Route path="edit" element={<ProfileEdit />} />
  //           <Route path="favorite" element={<ProfileFavorite />} />
  //         </Route>
  //         <Route path="/shop" element={<Shops />} />
  //         <Route path="/admin" element={<Admin />}>
  //           <Route path="users" element={<AdminUsers />} />
  //           <Route path="shops" element={<AdminShops />} />
  //         </Route>
  //         <Route path="/shop/add" element={<AddShop />} />
  //       </Routes>
  //     </div>
  //   );

  return (
    <BrowserRouter>
      <NotLoginPermission>
        <Header />
      </NotLoginPermission>
      <UserPermission>
        <UserHeader />
      </UserPermission>
      <OwnerPermission>
        <OwnerHeader />
      </OwnerPermission>
      <AdminPermission>
        <AdminHeader />
      </AdminPermission>
      <Container className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Protected access={[]}>
                <Home />
              </Protected>
            }
          />

          <Route
            path="/login"
            element={
              <Protected access={["notlogin"]}>
                <Logins />
              </Protected>
            }
          />

          <Route
            path="/shop/:id"
            element={
              <Protected access={[]}>
                <Shop />
              </Protected>
            }
          />

          <Route
            path="/shop/:id/edit"
            element={
              <Protected access={["admin", "owner"]}>
                <EditShop />
              </Protected>
            }
          />

          <Route
            path="/shop/:id/delete"
            element={
              <Protected access={["admin", "owner"]}>
                <DeleteShop />
              </Protected>
            }
          />

          <Route
            path="/logout"
            element={
              <Protected access={["default", "owner", "admin"]}>
                <Logouts />
              </Protected>
            }
          />

          <Route
            path="/search"
            element={
              <Protected access={[]}>
                <Search />
              </Protected>
            }
          />

          <Route
            path="/register"
            element={
              <Protected access={["notlogin"]}>
                <Registers />
              </Protected>
            }
          />

          <Route
            path="/profile"
            element={
              <Protected access={["admin", "owner", "default"]}>
                <Profile />
              </Protected>
            }
          >
            <Route path="view" element={<ProfileView />} />
            <Route path="edit" element={<ProfileEdit />} />
            <Route path="favorite" element={<ProfileFavorite />} />
          </Route>

          <Route
            path="/shop"
            element={
              <Protected access={["admin", "owner", "default"]}>
                <Shops />
              </Protected>
            }
          />
          <Route
            path="/admin"
            element={
              <Protected access={["admin"]}>
                <Admin />
              </Protected>
            }
          >
            <Route path="users" element={<AdminUsers />} />
            <Route path="shops" element={<AdminShops />} />
          </Route>

          <Route
            path="/shop/add"
            element={
              <Protected access={["owner", "admin", "default"]}>
                <AddShop />
              </Protected>
            }
          />

          <Route
            path="/account/confirm/:id"
            element={
              <Protected access={["notlogin"]}>
                <ConfirmEmail />
              </Protected>
            }
          />

          <Route path="*" element={<Lost />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Hooks
import { Container, useMediaQuery, useTheme } from "@mui/material";
import { useGlobalContext } from "./hooks/useGlobalContext";
import { useUserContext } from "./hooks/useUserContext";
import { useEffect } from "react";

// Components
import Header from "./components/Header";

// Pages
import Register from "./pages/Register";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import ShopAdd from "./pages/ShopAdd";
import Test from "./pages/Test";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Lost from "./pages/Lost";
import ProfileView from "./components/ProfileView";
import ProfileEdit from "./components/ProfileEdit";

const App = () => {
  const { dispatch, global } = useGlobalContext();
  const { user } = useUserContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch({ type: "SET_IS_MOBILE", payload: isMobile });
  }, [isMobile, dispatch]);

  return (
    <BrowserRouter>
      <Header />
      {/* {global.isLoading && <Loading />} */}
      <Container className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route exact path="/shop/add" element={<ShopAdd />} />

          <Route path="/login" element={<Login />} />

          <Route path="/profile" element={<Profile />}>
            <Route path="view" element={<ProfileView />} />
            <Route path="edit" element={<ProfileEdit />} />
          </Route>

          <Route path="*" element={<Test />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;

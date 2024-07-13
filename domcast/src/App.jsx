import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Import useEffect
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";
import HomeLogged from "./pages/HomeLogged";
import ConfirmRegistration from "./pages/ConfirmRegistration";
import RecoverPassword from "./pages/RecoverPassword";
import { userStore } from "./stores/UserStore";

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Corrected the duplicate declaration

  const loggedUser = userStore((state) => state.loggedUser);

  useEffect(() => {
    if (!loggedUser || !loggedUser.sessionToken) {
      navigate("/");
    }
  }, [loggedUser, navigate]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/domcast/*" element={loggedUser && loggedUser.sessionToken ? <HomeLogged /> : <Home />} />
        <Route path="/confirm-email/:token" element={<ConfirmRegistration />} />
        <Route path="/reset-password/:token" element={<RecoverPassword />} />
      </Routes>
    </>
  );
}

export default App;
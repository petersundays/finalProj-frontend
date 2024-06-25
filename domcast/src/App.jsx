import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import HomeNotLogged from "./pages/HomeNotLogged";
import HomeLogged from "./pages/HomeLogged";
import ConfirmRegistration from "./pages/ConfirmRegistration";

function App() {
  const { t } = useTranslation();

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<HomeNotLogged />} />
      <Route path='/domcast' element={<HomeLogged />} />
      <Route path='/confirm-email/:token' element={<ConfirmRegistration />} />

    </Routes>
    </>
  );
}

export default App;

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Home from "./pages/Home";
import HomeLogged from "./pages/HomeLogged";
import ConfirmRegistration from "./pages/ConfirmRegistration";
import RecoverPassword from './pages/RecoverPassword';

function App() {
  const { t } = useTranslation();

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/domcast' element={<HomeLogged />} />
      <Route path='/confirm-email/:token' element={<ConfirmRegistration />} />
      <Route path='/reset-password/:token' element={<RecoverPassword />} />

    </Routes>
    </>
  );
}

export default App;

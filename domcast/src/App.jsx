import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import HomeNotLogged from "./pages/HomeNotLogged";
import HomeLogged from "./pages/HomeLogged";

function App() {
  const { t } = useTranslation();

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/home' element={<HomeNotLogged />} />
      <Route path='/' element={<HomeLogged />} />

    </Routes>
    </>
  );
}

export default App;

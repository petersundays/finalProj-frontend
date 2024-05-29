import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Home from "./pages/Home";

function App() {
  const { t } = useTranslation();

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />

    </Routes>
    </>
  );
}

export default App;

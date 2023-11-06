import "./App.css";
// hooks
import { Routes, Route, useLocation } from "react-router-dom";
// components
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Home/HomePage.jsx";
import NavBar from "./components/navBar/NavBar.jsx";
import Header from './components/header/Header.jsx'
import DetailPage from "./pages/DetailPage";
import CreateGamePage from "./pages/CreateGamePage";
import NotFoundPage from "./pages/NotFoundPage";
import GamesNamePage from "./pages/GamesNamePage.jsx";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/" && (<><NavBar/> <Header/></>)}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/name" element={<GamesNamePage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/create" element={<CreateGamePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

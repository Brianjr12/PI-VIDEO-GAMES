import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Home/HomePage.jsx";
import DetailPage from "./pages/DetailPage";
import CreateGamePage from "./pages/CreateGamePage";
import NotFoundPage from "./pages/NotFoundPage";
import GamesNamePage from "./pages/GamesNamePage.jsx";

function App() {
  return (
    <>
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

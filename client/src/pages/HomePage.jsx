import { useEffect, useState } from "react";
import Cards from "../components/cards/Cards";

const HomePage = ({ videoGames }) => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    videoGames()
      .then((videoGamesData) => {
        setGames(videoGamesData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [videoGames]);

  return (
    <>
      <Cards games={games} />
    </>
  );
};

export default HomePage;

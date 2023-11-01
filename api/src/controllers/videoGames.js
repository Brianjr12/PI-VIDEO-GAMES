import { config } from "dotenv";
config();
import axios from "axios";
import models from "../db.js";
const { API_KEY } = process.env;

export const allVideoGames = async (req, res) => {
  try {
    // search for video games in the database
    const videoGamesFromDB = async () => {
      try {
        const { Videogame, Genre } = models;
        const videoGameDB = await Videogame.findAll({
          include: [
            {
              model: Genre,
              attributes: ["id", "name"],
            },
          ],
        });

        const filterVideoGameDB = videoGameDB.map(
          ({ id, name, platforms, image, released, rating, Genres }) => ({
            id,
            name,
            image,
            released,
            rating,
            genres: Genres.map(({ name }) => name),
            platforms,
          })
        );
        return filterVideoGameDB;
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    const videoGamesDB = await videoGamesFromDB();

    // search for video games in the API
    const maxPageSize = 100 - videoGamesDB.length; // sets the maximum page size allowed for the API
    const requestedPageSize = 20; // page size you want in your interface
    const pageSize = Math.min(requestedPageSize, maxPageSize); // Choose the smallest page size between the requested and the maximum allowed

    const page = req.query.page || 1; // Get the page number of the query, or use page 1 if not specified

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const videoGamesFromAPI = async () => {
      try {
        const URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${pageSize}&page=${page}`;
        const { data } = await axios.get(URL);
        const videoGameAPI = data.results
          .slice(startIndex, endIndex)
          .map(
            ({
              id,
              name,
              slug,
              background_image,
              released,
              rating,
              genres,
              parent_platforms,
            }) => ({
              id,
              name,
              slug,
              image: background_image,
              released,
              rating,
              genres: genres.map(({ name }) => name),
              platforms: parent_platforms.map(({ platform }) => platform.name),
            })
          );
        return videoGameAPI;
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    const videoGamesAPI = await videoGamesFromAPI();

    // An array was created with the game database and the API
    const combinedVideos = [...videoGamesDB, ...videoGamesAPI];
    // The matrix was limited to not exceed 20 video games
    const limitedVideoGames = combinedVideos.slice(0, 20);

    // console.log(
    //   `esta es la pagina ${page} y trae: ${limitedVideoGames.length} juegos`
    // );

    res.status(200).json(limitedVideoGames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



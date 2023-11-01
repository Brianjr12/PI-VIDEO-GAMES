import { config } from "dotenv";
config();
import axios from "axios";
import models from "../db.js";
const { API_KEY } = process.env;

export const videoGamesById = async (req, res) => {
  try {
    // search for the video game in the api
    const videoGameByIdApi = async (idVideogameAPI) => {
      try {
        const URL = `https://api.rawg.io/api/games/${idVideogameAPI}?key=${API_KEY}`;
        const { data } = await axios.get(URL);
        const videoGameApi = {
          id: data.id,
          name: data.name,
          description: data.description_raw,
          image: data.background_image,
          released: data.released,
          rating: data.rating,
          genres: data.genres.map(({ name, id }) => ({ id, name })),
          platforms: data.parent_platforms.map(({ platform }) => platform.name),
        };
        return videoGameApi;
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    // search the video game in the database
    const videoGameByIdDb = async (idVideogameDB) => {
      try {
        const { Videogame, Genre } = models;
        const videoGameDb = await Videogame.findByPk(idVideogameDB, {
          include: [
            {
              model: Genre,
              attributes: ["id", "name"],
            },
          ],
        });

        const filterVideoGameDb = {
          id: videoGameDb.id,
          name: videoGameDb.name,
          description: videoGameDb.description,
          image: videoGameDb.image,
          released: videoGameDb.releaseDate,
          rating: videoGameDb.rating,
          genres: videoGameDb.Genres.map(({ id, name }) => ({ id, name })),
          platforms: videoGameDb.platforms
        }

        return filterVideoGameDb;
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    // get search results
    const { idVideogame } = req.params;
    const regexIdDb = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
    if (regexIdDb.test(idVideogame)) {
      const videoGameFromDB = await videoGameByIdDb(idVideogame);
      return res.status(200).json(videoGameFromDB);
    } else {
      const videoGameFromAPI = await videoGameByIdApi(idVideogame);
      return res.status(200).json(videoGameFromAPI);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

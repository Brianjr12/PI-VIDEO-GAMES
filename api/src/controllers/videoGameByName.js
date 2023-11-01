import { config } from "dotenv";
config();
import axios from "axios";
import { Op } from "sequelize";
import models from "../db.js";
const { API_KEY } = process.env;
export const videoGamesByName = async (req, res) => {
  try {

    const { name } = req.query;
    // search the video games in the database
    const videoGamesFromDB = async () => {
      try {
        const { Videogame } = models;
        const videoGamesDb = await Videogame.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          limit: 15,
        });
        return videoGamesDb;
      } catch (error) {
        throw new Error(error.message);
      }
    };

    // search the video games in the API
    const videoGamesFromAPI = async () => {
      try {
        const URL = `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`;
        const { data } = await axios.get(URL);
        const videoGameApi = data.results.map(({ id, name, background_image,rating,genres,released, platforms }) => ({
          id,
          name,
          image:background_image,
          released,
          rating,
          genres: genres.map(({id,name}) => ({id,name})),
          platforms: platforms.map(({ platform }) => platform.name)
        }));
        return videoGameApi;
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    const videoGamesApi = await videoGamesFromAPI();
    const videoGamesDb = await videoGamesFromDB();
    // send 15 videogames from API if database is empty
    if (!videoGamesDb[0]) {
      if (videoGamesApi.length !== 0) {
        const videoGamesApiLimit = videoGamesApi.slice(0, 15);
        return res.status(200).json(videoGamesApiLimit);
      }
      return res.status(404).json({ message: "Video Game not found" });
    }
    // send 15 video games from database if the API is empty
    if (videoGamesApi.length === 0) {
      if (videoGamesDb) {
        const videoGamesDbLimit = videoGamesDb.slice(0, 15);
        return res.status(200).json(videoGamesDbLimit);
      }
      return res.status(404).json({ message: "Video game not found" });
    }
    // send 15 video games from the database and Api
    if (videoGamesApi.length > 0 && videoGamesDb[0]) {
      const combinedVideosGames = [...videoGamesDb, ...videoGamesApi];
      const combinedVideosGamesLimit = combinedVideosGames.slice(0, 15);
      return res.status(200).json(combinedVideosGamesLimit);
    } 
  } catch (error) {
    res.status(500).json({error:error.message})
  }
};

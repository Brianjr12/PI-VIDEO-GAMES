import { config } from "dotenv";
config();
import axios from "axios";
import models from "../db.js";
const { API_KEY } = process.env;

export const genres = async (req, res) => {
  try {
    // recived the genres from api and save in the db
    const saveGenresInDb = async (genresApi) => {
      try {
        const { Genre } = models;
        for (const { id, name } of genresApi) {
          await Genre.create({
            id,
            name,
          });
        }
        console.log("Genres saved successfully");
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    // get genres from the database
    const genresFromDB = async () => {
      try {
        const { Genre } = models;
        const genresDb = await Genre.findAll();
        return genresDb;
      } catch (error) {
        throw new Error(error.message);
      }
    };

    // get the genres fron the api
    const genresFromAPI = async () => {
      try {
        const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;
        const { data } = await axios(URL);
        const genresApi = data.results.map(({ id, name }) => ({ id, name }));
        return genresApi;
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    const genresDb = await genresFromDB();
    // Check if there are any genres in the database already
    let firstInstance = genresDb.length;

    if (firstInstance === 0) {
      const genresApi = await genresFromAPI();
      await saveGenresInDb(genresApi);
      return res.status(200).json(genresApi);
    } else {
      console.log("video games from db");
      return res.status(200).json(genresDb);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import { config } from "dotenv";
config();
import axios from "axios";
import models from '../db.js'
const { API_KEY } = process.env;

export const videoGamesById = async (req, res) => {
  try {
    const { idVideogame } = req.params;
    const URL = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
    const { data } = await axios.get(URL); 
    const videoGame = {
      id: data.id,
      name: data.name,
      description: data.description,
      rating: data.rating,
      releaseDate: data.released,
      platforms: data.platforms.map(({ platform }) => ({
        id: platform.id,
        name: platform.name,
        image: platform.image_background,
      })),
      genres: data.genres.map((g) => g.name),
    };
    
    return res.status(200).json(videoGame);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const videoGamesByName = async (req, res) => {
  try {
    const { Videogame } = models
    const { name } = req.query
    const videoGames = await Videogame.findOne({where:{name:name}})
    res.status(200).json(videoGames)
  } catch (error) {
    console.log(error);
  }
  
}

import axios from 'axios';

const videoGamesFromApi = async () => {
  try {
     const URL = "http://localhost:3001/api/videogames";
     const { data } = await axios.get(URL);
     return data;
  } catch (error) {
    throw error
  }
}

export const videoGames = async () => {
  try {
    const videoGamesData = await videoGamesFromApi();
    return videoGamesData
  } catch (error) {
    throw error
  }
}
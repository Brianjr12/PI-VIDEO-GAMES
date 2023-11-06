import { config } from "dotenv";
config();
import axios from "axios";
import models from "../db.js";
const { API_KEY } = process.env;

export const allVideoGames = async (req, res) => {
  try {
    let page = req.query.page || 1; // Get the page number of the query, or use page 1 if not specified
    // search for video games in the database
    const videoGamesFromDB = async (startIndex, endIndex) => {
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

        const filterVideoGameDB = videoGameDB
          .map(({ id, name, platforms, image, released, rating, Genres }) => ({
            id,
            name,
            image,
            released,
            rating,
            genres: Genres.map(({id, name }) => ({id,name})),
            platforms,
          }))
          .slice(startIndex, endIndex);
        return filterVideoGameDB;
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    const videoGamesDB = await videoGamesFromDB();

    // send the video games from the database
    const sendVideoGamesDB = async (page) => {
      try {
        let startIndex = 0;
        let endIndex = 15;
        let pages = 1;

        while (startIndex < videoGamesDB.length) {
          if (page === pages) {
            const videoGamesDBs = await videoGamesFromDB(startIndex, endIndex);
            return videoGamesDBs;
          }
          pages++;
          startIndex += 15;
          endIndex += 15;
        }
        return [];
      } catch (error) {
        throw new Error(error);
      }
    };
    // send video games from the API and database to the page
    const sendVideoGames = async (page) => {
      try {
        const videoGamesDbs = await sendVideoGamesDB(page);
        if (page <= 7) {
          const videoGamesAPI = await videoGamesFromAPI(page);
          //merge games with API games if less than 15 in database
          if (videoGamesDbs.length > 0 && videoGamesDbs.length < 15) {
            const allVideoGames = [...videoGamesDbs, ...videoGamesAPI].slice(
              0,
              15
            );
            return res
              .status(200)
              .json({ games: allVideoGames, limit: 100 + videoGamesDB.length });
          }
          if (videoGamesDbs.length === 0)
            return res.status(200).json({ games: videoGamesAPI });

          return res
            .status(200)
            .json({ games: videoGamesDbs, limit: videoGamesDB.length });
        }
      // send video games from the database to the pages
        return res.status(200).json({games:videoGamesDbs,limit:videoGamesDB.length});
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };

    // search for video games in the API
    const videoGamesFromAPI = async (page) => {
      try {
        const maxPageSize = 100 // sets the maximum page size allowed for the API
        const requestedPageSize = 15;
        const pageSize = Math.min(requestedPageSize, maxPageSize); // Choose the smallest page size between the requested and the maximum allowed

        const URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${pageSize}&page=${page}`;
        const { data } = await axios.get(URL);
        const videoGameAPI = data.results.map(
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
            genres: genres.map(({ id, name }) => ({id, name })),
            platforms: parent_platforms.map(({ platform }) => platform.name),
          })
        );
        return videoGameAPI;
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    // validate if database is empty
    if (videoGamesDB.length === 0) {
      if (Number(page) <= 7) {
        const videoGamesAPI = await videoGamesFromAPI(Number(page));
        return res.status(200).json({games:videoGamesAPI,limit:100});
      }
      return []
    }
    // execute the assigned function to send the video games
    sendVideoGames(Number(page));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

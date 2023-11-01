import models from '../db.js'
export const createVideoGame = async (req, res) => {
  try {
    const { Videogame } = models;
    const { name, description, platforms, image, released, rating,genres } = req.body;
    const newVideoGame = await Videogame.create({
      name,
      description,
      platforms,
      image,
      released,
      rating,
    });

    if (genres && genres.length > 0) {
      await newVideoGame.addGenres(genres);
    }
    res.status(201).json({ message: "successfully created video game" });
  } catch (error) {
    res.status(400).json({error:error.message})}
};

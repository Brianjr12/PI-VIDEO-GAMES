import models from '../db.js'
export const createVideoGame = async (req, res) => {
  try {
    const { Videogame } = models;
    const { name, description, platforms, image, released, rating } = req.body;
    const newVideoGame = await Videogame.create({
      name,
      description,
      platforms,
      image,
      released,
      rating,
    });
    res.status(200).send("video game recived");
  } catch (error) {
    console.log(error);
  }
};

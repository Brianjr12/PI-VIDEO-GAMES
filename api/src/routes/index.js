import { Router } from 'express';
import { allVideoGames} from '../controllers/videoGames.js';
import {createVideoGame} from '../controllers/newVideogame.js'
import { genres } from '../controllers/getGenres.js';
import { videoGamesById } from '../controllers/videoGameById.js';
import { videoGamesByName } from '../controllers/videoGameByName.js';
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/genres", genres )
router.get("/videogames",allVideoGames)
router.get("/videogames/name",videoGamesByName)
router.get("/videogames/:idVideogame", videoGamesById);
router.post("/videogames",createVideoGame);


export default router;

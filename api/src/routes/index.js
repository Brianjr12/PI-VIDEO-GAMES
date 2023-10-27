import { Router } from 'express';
import { videoGamesById, videoGamesByName } from '../controllers/testController.js';
import {createVideoGame} from '../controllers/newVideogame.js'
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get("/videogames/:idVideogame", videoGamesById);
router.get("/videogames/name",videoGamesByName)
router.post("/videogames",createVideoGame);


export default router;

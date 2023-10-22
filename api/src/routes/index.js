import { Router } from 'express';
import { test } from '../controllers/testController.js';
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/",test)


export default router;

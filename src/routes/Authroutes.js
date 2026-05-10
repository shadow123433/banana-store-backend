import express from 'express';
import { Router } from 'express';
import controllers from '../controllers/Authcontroller.js';// O caminho deve ser onde está seu arquivo de middleware
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post('/Register', controllers.cadastro);
router.post('/Login', controllers.login);

export default router;
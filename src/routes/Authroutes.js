import express from 'express';
import { Router } from 'express';
import controllers from '../controllers/Authcontroller.js';

const router = Router();

router.post('/Register', controllers.cadastro);
router.post('/Login', controllers.login);

export default router;
import express from 'express';
import { Router } from 'express';
import controllers from '../controllers/PedidosControllers.js';


const router = Router();

router.post('/', controllers.createPedido);

export default router;
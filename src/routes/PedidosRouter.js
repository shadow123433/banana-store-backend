import { Router } from 'express';
import controllers from '../controllers/PedidosControllers.js';
// 1. Você PRECISA importar o middleware aqui para ele ser reconhecido
import { authMiddleware } from '../middlewares/auth.js'; 

const router = Router();

// 2. Agora o 'authMiddleware' não é mais um nome vazio, o Node sabe o que ele faz
router.post('/', authMiddleware, controllers.createPedido);
router.get('/MeusPedidos', authMiddleware, controllers.getMeusPedidos);
router.patch('/:id/cancelar', authMiddleware, controllers.cancelarPedido);


export default router;
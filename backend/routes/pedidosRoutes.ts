import  orderController  from '../controllers/pedidosController';
import userControllers from '../controllers/userControllers';
import midlleware from '../middleware/middleware';
import { Router } from 'express';

const routes = Router();

// Rutas de usuario

routes.post('/register', userControllers.registerUser);
routes.post('/login', userControllers.loginUser);

//rutas protegidas de pedidos
routes.get('/orders', orderController.getOrders);
routes.post('/orders', midlleware.authenticateUser, orderController.addOrders);
routes.get('/orders/:id', midlleware.authenticateUser, orderController.searchOrder);
routes.delete('/orders/:id', midlleware.authenticateUser, orderController.deleteOrder);
routes.put('/orders/:id', midlleware.authenticateUser, orderController.edditOrder);

export default routes;


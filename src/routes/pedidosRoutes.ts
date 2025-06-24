import  orderController  from '../controllers/pedidosController';
import userController from '../controllers/userControllers';
import midlleware from '../middleware/middleware';
import { Router } from 'express';

const routes = Router();

// Rutas de usuario

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);

//rutas protegidas de pedidos
routes.get('/orders', midlleware.authenticateUser, orderController.getOrders);
routes.post('/orders', midlleware.authenticateUser, orderController.addOrders);
routes.get('/orders/:id', midlleware.authenticateUser, orderController.searchOrder);
routes.delete('/orders/:id', midlleware.authenticateUser, orderController.deleteOrder);
routes.put('/orders/:id', midlleware.authenticateUser, orderController.edditOrder);

export default routes;
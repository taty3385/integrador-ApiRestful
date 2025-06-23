import  orderController  from '../controllers/pedidosController';
import { Router } from 'express';

const routes = Router();

routes.get('/orders', orderController.getOrders);
routes.post('/orders', orderController.addOrders);
routes.get('/orders/:id', orderController.searchOrder);
routes.delete('/orders/:id', orderController.deleteOrder);
routes.put('/orders/:id', orderController.edditOrder);

export default routes;
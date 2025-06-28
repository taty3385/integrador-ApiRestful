"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pedidosController_1 = __importDefault(require("../controllers/pedidosController"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const middleware_1 = __importDefault(require("../middleware/middleware"));
const express_1 = require("express");
const routes = (0, express_1.Router)();
// Rutas de usuario
routes.post('/register', userControllers_1.default.registerUser);
routes.post('/login', userControllers_1.default.loginUser);
//rutas protegidas de pedidos
routes.get('/orders', middleware_1.default.authenticateUser, pedidosController_1.default.getOrders);
routes.post('/orders', middleware_1.default.authenticateUser, pedidosController_1.default.addOrders);
routes.get('/orders/:id', middleware_1.default.authenticateUser, pedidosController_1.default.searchOrder);
routes.delete('/orders/:id', middleware_1.default.authenticateUser, pedidosController_1.default.deleteOrder);
routes.put('/orders/:id', middleware_1.default.authenticateUser, pedidosController_1.default.edditOrder);
exports.default = routes;

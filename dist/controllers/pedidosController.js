"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pedidos_Model_1 = __importDefault(require("../model/pedidos.Model"));
const pedidosController = {
    // obtener pedidos
    getOrders: (req, res) => {
        const orders = pedidos_Model_1.default.readOrder();
        if (!orders) {
            res.status(404).json({ message: "No hay pedidos disponibles" });
            return;
        }
        res.status(200).json({ message: "Pedidos encontrados", orders });
        return;
    },
    // agregar pedidos
    addOrders: (req, res) => {
        const { nombre, descripcion, cantidad } = req.body;
        if (!nombre || !descripcion || !cantidad) {
            res.status(400).json({ message: "Faltan datos para crear el pedido" });
            return;
        }
        const newOrder = pedidos_Model_1.default.addOrder({ nombre, descripcion, cantidad });
        res.status(201).json({ message: "Pedido creado", newOrder });
        return;
    },
    // buscar
    searchOrder: (req, res) => {
        const { id } = req.params;
        const order = pedidos_Model_1.default.searchOrder(Number(id));
        if (!order) {
            res.status(404).json({ message: "Pedido no encontrado" });
            return;
        }
        res.status(200).json({ message: "Pedido encontrado", order });
        return;
    },
    // eliminar
    deleteOrder: (req, res) => {
        const { id } = req.params;
        const deleted = pedidos_Model_1.default.deleteOder(Number(id));
        if (!deleted) {
            res.status(404).json({ message: "Pedido no encontrado" });
            return;
        }
        res.status(200).json({ message: "Pedido eliminado", id });
        return;
    },
    // editar
    edditOrder: (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion, cantidad } = req.body;
        const updated = pedidos_Model_1.default.editOrder(Number(id), { nombre, descripcion, cantidad });
        if (!updated) {
            res.status(404).json({ message: "Pedido no encontrado" });
            return;
        }
        res.status(200).json({ message: "Pedido actualizado", id });
        return;
    }
};
exports.default = pedidosController;

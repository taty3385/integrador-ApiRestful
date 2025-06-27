"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.resolve(__dirname, "../data/pedidos.json");
const modelOrder = {
    // leer archivo
    readOrder: () => {
        if (!fs_1.default.existsSync(filePath)) {
            fs_1.default.writeFileSync(filePath, "[]", "utf8");
            return [];
        }
        const contenido = fs_1.default.readFileSync(filePath, "utf8");
        return contenido ? JSON.parse(contenido) : [];
    },
    // escribir archivo
    writeOrder: (pedidos) => {
        const pedido = JSON.stringify(pedidos, null, 2);
        fs_1.default.writeFileSync(filePath, pedido, "utf8");
    },
    // agregar
    addOrder: (pedido) => {
        const pedidos = modelOrder.readOrder();
        const newPedido = {
            id: Date.now(),
            nombre: pedido.nombre,
            descripcion: pedido.descripcion,
        };
        pedidos.push(newPedido);
        modelOrder.writeOrder(pedidos);
        return pedidos;
    },
    // editar
    editOrder: (id, updateOrder) => {
        const orders = modelOrder.readOrder();
        const searchOeders = orders.find((pedido) => pedido.id === id);
        if (!searchOeders) {
            return false;
        }
        searchOeders.nombre = updateOrder.nombre;
        searchOeders.descripcion = updateOrder.descripcion;
        modelOrder.writeOrder(orders);
        return true;
    },
    // buscar
    searchOrder: (id) => {
        const orders = modelOrder.readOrder();
        const findOrder = orders.find((order) => order.id === id);
        if (!findOrder) {
            return false;
        }
        return orders;
    },
    // eliminar
    deleteOder: (id) => {
        const orders = modelOrder.readOrder();
        const filterOrder = orders.filter((o) => o.id !== id);
        if (!filterOrder) {
            return null;
        }
        modelOrder.writeOrder(filterOrder);
        return filterOrder;
    },
};
exports.default = modelOrder;

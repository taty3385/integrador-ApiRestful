import modelOrder from "../model/pedidos.Model";
import { Request, Response } from "express";

const pedidosController = {
  getOrders: (req: Request, res: Response) => {
    const orders = modelOrder.readOrder();
    if (!orders) {
      return res.status(404).json({ message: "No hay pedidos disponibles" });
    }
    return res.status(200).json({ message: "Pedidos encontrados", orders });
  },
  addOrders: (req: Request, res: Response) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
      return res
        .status(400)
        .json({ message: "Faltan datos para crear el pedido" });
    }
    const newOrder = modelOrder.addOrder({ nombre, descripcion });
    return res.status(201).json({ message: "Pedido creado", newOrder });
  },
  searchOrder: (req: Request, res: Response) => {
    const { id } = req.params;
    const order = modelOrder.searchOrder(Number(id));
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    return res.status(200).json({ message: "Pedido encontrado", order });
  },
  deleteOrder: (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = modelOrder.deleteOder(Number(id));
    if (!deleted) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    return res.status(200).json({ message: "Pedido eliminado", id });
  },
};

export default pedidosController;

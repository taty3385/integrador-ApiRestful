import modelOrder from "../model/pedidos.Model";
import { Request, Response } from "express";

const pedidosController = {
  // obtener pedidos
  getOrders: (req: Request, res: Response) => {
    const orders = modelOrder.readOrder();
    if (!orders) {
     res.status(404).json({ message: "No hay pedidos disponibles" });
        return;
    }
     res.status(200).json({ message: "Pedidos encontrados", orders });
     return;
  },
  // agregar pedidos
  addOrders: (req: Request, res: Response) => {
    const { nombre, descripcion , cantidad } = req.body;
    if (!nombre || !descripcion || !cantidad) {
      res.status(400).json({ message: "Faltan datos para crear el pedido" });
      return;
    }
    const newOrder = modelOrder.addOrder({ nombre, descripcion , cantidad });
    res.status(201).json({ message: "Pedido creado", newOrder });
    return;
  },
  // buscar
  searchOrder: (req: Request, res: Response) => {
    const { id } = req.params;
    const order = modelOrder.searchOrder(Number(id));
    if (!order) {
    res.status(404).json({ message: "Pedido no encontrado" });
        return;
    }
   res.status(200).json({ message: "Pedido encontrado", order });
   return;
  },

  // eliminar
  deleteOrder: (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = modelOrder.deleteOder(Number(id));
    if (!deleted) {
      res.status(404).json({ message: "Pedido no encontrado" });
      return;
    }
    res.status(200).json({ message: "Pedido eliminado", id });
    return;
  },
  // editar
  edditOrder: (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion, cantidad } = req.body;
    const updated = modelOrder.editOrder(Number(id), { nombre , descripcion , cantidad });
    if (!updated) {
      res.status(404).json({ message: "Pedido no encontrado" });
      return;
    }
    res.status(200).json({ message: "Pedido actualizado", id });
    return;
  }
};

export default pedidosController;

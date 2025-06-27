import fs from "fs";
import path from "path";

const filePath = path.resolve(__dirname, "../data/pedidos.json");


const modelOrder = {
  // leer archivo
readOrder: () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
    return [];
  }

  const contenido = fs.readFileSync(filePath, "utf8");
  return contenido ? JSON.parse(contenido) : [];
},

  // escribir archivo
  writeOrder: (pedidos: any) => {
    const pedido = JSON.stringify(pedidos, null, 2);
    fs.writeFileSync(filePath, pedido, "utf8");
  },
// agregar
  addOrder: (pedido: { nombre: string; descripcion: string }) => {
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
  editOrder: (
    id: number,
    updateOrder: { nombre: string; descripcion: string }
  ) => {
    const orders = modelOrder.readOrder();
    const searchOeders = orders.find((pedido: any) => pedido.id === id);
    if (!searchOeders) {
      return false;
    }
    searchOeders.nombre = updateOrder.nombre;
    searchOeders.descripcion = updateOrder.descripcion;
    modelOrder.writeOrder(orders);
    return true;
  },
  // buscar
  searchOrder: (id: number) => {
    const orders = modelOrder.readOrder();
    const findOrder = orders.find((order: any) => order.id === id);
    if (!findOrder) {
      return false;
    }
    return orders;
  },

  // eliminar
  deleteOder: (id: number) => {
    const orders = modelOrder.readOrder();
    const filterOrder = orders.filter((o: any) => o.id !== id);
    if (!filterOrder) {
      return null;
    }
    modelOrder.writeOrder(filterOrder);
    return filterOrder;
  },

 
};

export default modelOrder;

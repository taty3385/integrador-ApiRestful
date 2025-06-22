import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/pedidos.json");

const modelOrder={

 readOrder :()=> {
  const contenido = fs.readFileSync(filePath, "utf8");
  if (!contenido) {
    fs.writeFileSync(filePath, "[]", "utf8");
    return [];
  }

  const pedido = JSON.parse(contenido);
  return pedido;
},

 writeOrder : (pedidos: any) => {
  const pedido = JSON.stringify(pedidos, null, 2);
  fs.writeFileSync(filePath, pedido, "utf8");
},

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

editOrder:(id:number, updateOrder:{nombre:string, descripcion:string})=>{
const orders= modelOrder.readOrder()
const searchOeders= orders.find((pedido:any)=>pedido.id=== id)
if (!searchOeders){
    return false
}
 searchOeders.nombre=updateOrder.nombre
 searchOeders.descripcion=updateOrder.descripcion
 modelOrder.writeOrder(orders)
 return true
},
searchOrder:(id: number)=>{
    const orders= modelOrder.readOrder()
    const findOrder=orders.find((order:any)=>order.id===id)
   if (!findOrder){
       return false
    }
    return orders

}

// eliminar y testear la busqueda  si anda bien 

}

export default modelOrder;
import modelOrder from '../src/model/pedidos.Model';

const nuevoPedido = {
  nombre: 'Empanada',
  descripcion: 'Carne picante'
};

const resultado = modelOrder.addOrder(nuevoPedido);
console.log('Pedido agregado:', resultado);

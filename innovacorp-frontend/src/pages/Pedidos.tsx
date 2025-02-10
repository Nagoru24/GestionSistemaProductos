import React, { useEffect, useState } from 'react';
import { listarPedidos, obtenerPedidosPorUsuario } from '../services/pedidosService';
import PedidoItem from '../components/PedidoItem';
import PedidoForm from '../components/PedidoForm';

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Obtener los pedidos al cargar el componente
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setIsAdmin(user.tipo === 'admin');

        // Obtener los pedidos según el tipo de usuario
        const data = isAdmin ? await listarPedidos() : await obtenerPedidosPorUsuario(user.id);
        setPedidos(data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchPedidos();
  }, [isAdmin]);

  return (
    <div>
      <h1>{isAdmin ? 'Todos los Pedidos' : 'Mis Pedidos'}</h1>

      {/* Mostrar el formulario de pedidos solo para clientes */}
      {!isAdmin && <PedidoForm />}

      {/* Tabla de pedidos */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <PedidoItem key={pedido.id} pedido={pedido} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pedidos;
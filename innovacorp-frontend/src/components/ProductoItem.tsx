// ProductoItem.tsx

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Producto, realizarPedido } from "../services/productosService";

interface ProductoItemProps {
  producto: Producto;
  onEditar: (producto: Producto) => void;
  onEliminar: (id: number) => void;
  onPedidoRealizado: (producto: Producto) => void; // Nueva prop para manejar el pedido
}

const ProductoItem: React.FC<ProductoItemProps> = ({ producto, onEditar, onEliminar, onPedidoRealizado }) => {
  const rol = localStorage.getItem("rol"); // Obtener el rol del usuario
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad del pedido

  const handlePedido = async () => {
    try {
      const productoActualizado = await realizarPedido(producto.id, cantidad);
      onPedidoRealizado(productoActualizado);
      alert("Pedido realizado con éxito");
    } catch (error) {
      alert("Error al realizar el pedido");
    }
  };

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>{producto.descripcion}</td>
      <td>{producto.categoria}</td>
      <td>${producto.precio}</td>
      <td>{producto.stock}</td>
      
      {/* Solo mostrar botones si el usuario es ADMIN */}
      {rol === "admin" && (
        <td>
          <Button variant="warning" className="me-2" onClick={() => onEditar(producto)}>
            Editar
          </Button>
          <Button variant="danger" onClick={() => onEliminar(producto.id)}>
            Eliminar
          </Button>
        </td>
      )}

      {/* Mostrar botón de pedido si el usuario es CLIENTE */}
      {rol === "cliente" && (
        <td>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            min="1"
            max={producto.stock}
          />
          <Button variant="success" onClick={handlePedido}>
            Hacer Pedido
          </Button>
        </td>
      )}
    </tr>
  );
};


export default ProductoItem;
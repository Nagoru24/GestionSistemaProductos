// Productos.tsx

import React, { useEffect, useState } from "react";
import { obtenerProductos, Producto } from "../services/productosService";
import { Container, Table } from "react-bootstrap";
import ProductoItem from "../components/ProductoItem";
import ProductoForm from "../components/ProductoForm";

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const rol = localStorage.getItem("rol"); // Obtener rol del usuario

  // Productos.tsx

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Debes iniciar sesión para ver los productos.");
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "/login"; // Ajusta la ruta según tu aplicación
  } else {
    cargarProductos();
  }
}, []);

  const cargarProductos = async () => {
    const data = await obtenerProductos();
    setProductos(data);
  };

  const handleProductoAgregado = (nuevoProducto: Producto) => {
    setProductos([...productos, nuevoProducto]);
  };
  
  const handleEliminarProducto = (id: number) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };
  
  const handleEditarProducto = (productoEditado: Producto) => {
    setProductos(productos.map((producto) => (producto.id === productoEditado.id ? productoEditado : producto)));
  };

  const handlePedidoRealizado = (productoActualizado: Producto) => {
    setProductos(productos.map((producto) => (producto.id === productoActualizado.id ? productoActualizado : producto)));
  };

  return (
    <Container>
      <h2 className="mt-4">Lista de Productos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            {rol === "admin" && <th>Acciones</th>} {/* Solo se muestra si es admin */}
            {rol === "cliente" && <th>Pedido</th>} {/* Solo se muestra si es cliente */}
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <ProductoItem
              key={producto.id}
              producto={producto}
              onEditar={handleEditarProducto}
              onEliminar={handleEliminarProducto}
              onPedidoRealizado={handlePedidoRealizado} // Pasar la función de manejo de pedido
            />
          ))}
        </tbody>
      </Table>

      {/* Solo mostrar el formulario si el usuario es ADMIN */}
      {rol === "admin" && (
        <>
          <h3 className="mt-4">Agregar Producto</h3>
          <ProductoForm onProductoAgregado={handleProductoAgregado} />
        </>
      )}
    </Container>
  );
};

export default Productos;
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { agregarProducto, Producto } from "../services/productosService";

interface Props {
  onProductoAgregado: (producto: Producto) => void;
}

const ProductoForm: React.FC<Props> = ({ onProductoAgregado }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !descripcion || !categoria || !precio || !stock) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const nuevoProducto = await agregarProducto({
        nombre,
        descripcion,
        categoria,
        precio: parseFloat(precio),
        stock: parseInt(stock),
      });

      onProductoAgregado(nuevoProducto);
      setNombre("");
      setDescripcion("");
      setCategoria("");
      setPrecio("");
      setStock("");
    } catch (error) {
      alert("Error al agregar el producto");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Categoría</Form.Label>
        <Form.Control type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Agregar Producto
      </Button>
    </Form>
  );
};

export default ProductoForm;

import { api } from "./api";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
}


export const obtenerProductos = async (): Promise<Producto[]> => {
  try {
    const response = await api.get<Producto[]>("/productos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
};


export const agregarProducto = async (producto: Omit<Producto, "id">) => {
  try {
    const response = await api.post<Producto>("/productos", producto);
    return response.data;
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    throw error;
  }
};

export const eliminarProducto = async (id: number) => {
  try {
    await api.delete(`/productos/${id}`);
    console.log(`Producto con ID ${id} eliminado`);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

export const editarProducto = async (id: number, producto: Omit<Producto, "id">) => {
  try {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error;
  }
};

export const realizarPedido = async (id: number, cantidad: number): Promise<Producto> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No hay token disponible");
    }

    const response = await api.patch<Producto>(
      `/productos/${id}/pedido`,
      { cantidad },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al realizar el pedido:", error);
    throw error;
  }
};





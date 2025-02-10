package com.innovacorp.gesinnovacorp.service;

import com.innovacorp.gesinnovacorp.model.Inventario;
import com.innovacorp.gesinnovacorp.model.Producto;
import com.innovacorp.gesinnovacorp.repository.InventarioRepository;
import com.innovacorp.gesinnovacorp.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InventarioService {
    @Autowired
    private InventarioRepository inventarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<Inventario> listarMovimientos() {
        return inventarioRepository.findAll();
    }

    public Inventario registrarMovimiento(Inventario inventario) {
        Producto producto = productoRepository.findById(inventario.getProducto().getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Actualizar stock
        if (inventario.getTipo() == Inventario.TipoMovimiento.entrada) {
            producto.setStock(producto.getStock() + inventario.getCantidad());
        } else if (inventario.getTipo() == Inventario.TipoMovimiento.salida) {
            if (producto.getStock() < inventario.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para la salida");
            }
            producto.setStock(producto.getStock() - inventario.getCantidad());
        }

        productoRepository.save(producto);
        return inventarioRepository.save(inventario);
    }

    public List<Inventario> obtenerMovimientosPorProducto(Long productoId) {
        return inventarioRepository.findByProductoId(productoId);
    }
}

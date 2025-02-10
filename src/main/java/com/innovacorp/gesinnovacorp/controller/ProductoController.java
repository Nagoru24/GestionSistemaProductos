package com.innovacorp.gesinnovacorp.controller;

import com.innovacorp.gesinnovacorp.model.Producto;
import com.innovacorp.gesinnovacorp.repository.ProductoRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {
    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> agregarProducto(@RequestBody Producto producto, HttpServletRequest request) {
        if (!esAdmin(request)) {
            return ResponseEntity.status(403).body("No tienes permisos para esta acción");
        }
        return ResponseEntity.ok(productoRepository.save(producto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado, HttpServletRequest request) {
        if (!esAdmin(request)) {
            return ResponseEntity.status(403).body("No tienes permisos para esta acción");
        }
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setNombre(productoActualizado.getNombre());
                    producto.setDescripcion(productoActualizado.getDescripcion());
                    producto.setCategoria(productoActualizado.getCategoria());
                    producto.setPrecio(productoActualizado.getPrecio());
                    producto.setStock(productoActualizado.getStock());
                    return ResponseEntity.ok(productoRepository.save(producto));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id, HttpServletRequest request) {
        if (!esAdmin(request)) {
            return ResponseEntity.status(403).body("No tienes permisos para esta acción");
        }
        productoRepository.deleteById(id);
        return ResponseEntity.ok("Producto eliminado");
    }

    private boolean esAdmin(HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        System.out.println("Rol recibido en controlador: " + role);
        return "ADMIN".equals(role);
    }

}

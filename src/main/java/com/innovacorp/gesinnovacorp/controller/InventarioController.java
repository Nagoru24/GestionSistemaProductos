package com.innovacorp.gesinnovacorp.controller;

import com.innovacorp.gesinnovacorp.model.Inventario;
import com.innovacorp.gesinnovacorp.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventario")
public class InventarioController {
    @Autowired
    private InventarioService inventarioService;

    @GetMapping
    public List<Inventario> listarMovimientos() {
        return inventarioService.listarMovimientos();
    }

    @PostMapping
    public Inventario registrarMovimiento(@RequestBody Inventario inventario) {
        return inventarioService.registrarMovimiento(inventario);
    }

    @GetMapping("/producto/{productoId}")
    public List<Inventario> obtenerMovimientosPorProducto(@PathVariable Long productoId) {
        return inventarioService.obtenerMovimientosPorProducto(productoId);
    }
}

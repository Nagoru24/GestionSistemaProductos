package com.innovacorp.gesinnovacorp.controller;

import com.innovacorp.gesinnovacorp.model.DetallePedido;
import com.innovacorp.gesinnovacorp.service.DetallePedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/detallespedido")
public class DetallePedidoController {
    @Autowired
    private DetallePedidoService detallePedidoService;

    @GetMapping
    public List<DetallePedido> listarTodosLosDetalles() {
        return detallePedidoService.listarTodosLosDetalles();
    }

    /*@GetMapping("/{pedidoId}")
    public List<DetallePedido> obtenerDetallesPorPedido(@PathVariable Long pedidoId) {
        return detallePedidoService.obtenerDetallesPorPedido(pedidoId);
    }*/

    @PostMapping
    public DetallePedido agregarDetallePedido(@RequestBody DetallePedido detallePedido) {
        return detallePedidoService.agregarDetallePedido(detallePedido);
    }
}

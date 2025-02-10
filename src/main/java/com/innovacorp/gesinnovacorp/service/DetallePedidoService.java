package com.innovacorp.gesinnovacorp.service;

import com.innovacorp.gesinnovacorp.model.DetallePedido;
import com.innovacorp.gesinnovacorp.repository.DetallePedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DetallePedidoService {
    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    public List<DetallePedido> listarTodosLosDetalles() {
        List<DetallePedido> detalles = detallePedidoRepository.findAll();
        System.out.println("📌 Total detalles en BD: " + detalles.size());
        return detalles;
    }


   /* public List<DetallePedido> obtenerDetallesPorPedido(Long pedidoId) {
        return detallePedidoRepository.findByPedidoId(pedidoId);
    }*/

    public DetallePedido agregarDetallePedido(DetallePedido detallePedido) {
        return detallePedidoRepository.save(detallePedido);
    }
}

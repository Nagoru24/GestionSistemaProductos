package com.innovacorp.gesinnovacorp.repository;

import com.innovacorp.gesinnovacorp.model.DetallePedido;
import com.innovacorp.gesinnovacorp.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
    /*List<DetallePedido> findByPedidoId(Pedido pedido);*/
}
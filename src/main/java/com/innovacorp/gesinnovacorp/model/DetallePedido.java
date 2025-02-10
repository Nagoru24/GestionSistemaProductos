
package com.innovacorp.gesinnovacorp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "DetallesPedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetallePedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    private int cantidad;
    @Column(name = "precio_unitario")
    private double precioUnitario;

    private double subtotal;

    @PrePersist
    public void calcularSubtotal() {
        this.subtotal = this.cantidad * this.precioUnitario;
    }
}


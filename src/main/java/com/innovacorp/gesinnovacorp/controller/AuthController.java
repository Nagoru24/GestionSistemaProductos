package com.innovacorp.gesinnovacorp.controller;

import com.innovacorp.gesinnovacorp.config.JwtUtil;
import com.innovacorp.gesinnovacorp.model.Usuario;
import com.innovacorp.gesinnovacorp.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        // Si no se especifica el rol, por defecto será CLIENTE
        if (usuario.getRol() == null) {
            usuario.setRol(Usuario.Rol.cliente);
        }

        Usuario nuevoUsuario = authService.registrarUsuario(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioAutenticado = authService.autenticarUsuario(usuario.getEmail(), usuario.getContraseña());

        if (usuarioAutenticado.isPresent()) {
            String token = jwtUtil.generateToken(usuario.getEmail(), usuarioAutenticado.get().getRol().name());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("rol", usuarioAutenticado.get().getRol().name());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }
}

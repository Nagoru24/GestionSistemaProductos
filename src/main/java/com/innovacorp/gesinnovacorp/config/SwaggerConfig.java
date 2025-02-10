package com.innovacorp.gesinnovacorp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de InnovaCorp")
                        .version("1.0")
                        .description("Documentación de la API para la gestión de productos y pedidos en InnovaCorp")
                        .contact(new Contact()
                                .name("Anel Pineda")
                                .email("anelxp24@gmail.com"))
                        .license(new License()
                                .name("Licencia MIT")
                                .url("https://opensource.org/licenses/MIT")));
    }
}

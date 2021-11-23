package com.ser515.soccer;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync @SpringBootApplication
@OpenAPIDefinition(info = @Info(
        title = "Soccer Tournament REST API",
        description = "Spring Boot REST API for Soccer Tournament Management Web Application",
        version = "1.0",
        termsOfService = "Terms of Service",
        contact = @Contact(),
        license = @License(
                name = "Apache License Version 2.0",
                url = "https://www.apache.org/licenses/LICENSE-2.0"
        )
))
@SecurityScheme(name = "JWT Based Authentication", type = SecuritySchemeType.HTTP, scheme = "bearer",
        bearerFormat = "JWT")
public class SoccerApplication {
    public static void main(String[] args) {
        SpringApplication.run(SoccerApplication.class, args);
    }
}

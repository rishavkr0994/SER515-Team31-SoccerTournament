package com.ser515.soccer.rest;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequestMapping("rest/test")
public class TestAPI {
    @Operation(description = "Test API to check if the server is running")
    @GetMapping(value = "", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> test() {
        return ResponseEntity.ok().body("Hello ! You have reached the Test API For Soccer Tournament Web Services");
    }
}

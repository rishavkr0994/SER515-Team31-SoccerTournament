package com.ser515.soccer.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequestMapping("rest/test")
public class TestAPI {
    @GetMapping("")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok().body("Hello ! You have reached the Test API For Soccer Tournament Web Services");
    }
}

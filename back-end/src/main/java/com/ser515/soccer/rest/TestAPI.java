package com.ser515.soccer.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value="Test API", description="Rest APIs For Running Some Test / Debugging")
@RestController @RequestMapping("rest/test")
public class TestAPI {
    @ApiOperation(value = "Test API to check if the server is running")
    @GetMapping("")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok().body("Hello ! You have reached the Test API For Soccer Tournament Web Services");
    }
}

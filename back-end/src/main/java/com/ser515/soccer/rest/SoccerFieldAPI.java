package com.ser515.soccer.rest;

import com.ser515.soccer.database.datamodel.SoccerField;
import com.ser515.soccer.database.repository.SoccerFieldRepository;
import com.ser515.soccer.rest.datamodel.APIResponseBody;
import com.ser515.soccer.rest.datamodel.AddSoccerFieldRequestBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "JWT Based Authentication")
@RestController @RequestMapping("/rest/field")
public class SoccerFieldAPI {
    SoccerFieldRepository soccerFieldRepository;

    public SoccerFieldAPI(SoccerFieldRepository soccerFieldRepository) {
        this.soccerFieldRepository = soccerFieldRepository;
    }

    // TODO: Convert Response Body To Paged Response Body For Handling Large Tournament Lists With The General Get API
    @Operation(description = "Get list of all the soccer fields or a soccer field by name")
    @GetMapping(value = {"", "/{name}"})
    public ResponseEntity<Object> get(@PathVariable(required = false) String name) {
        if (name == null) {
            List<SoccerField> soccerFieldList = soccerFieldRepository.findAll();
            return ResponseEntity.ok().body(APIResponseBody.success(soccerFieldList));
        } else {
            SoccerField soccerField = soccerFieldRepository.findByName(name).orElse(null);
            if (soccerField == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(APIResponseBody.failure(
                        "The tournament name is not valid"));
            else return ResponseEntity.ok().body(APIResponseBody.success(soccerField));
        }
    }

    @Operation(description = "Add a soccer field information to database")
    @PostMapping("")
    public ResponseEntity<Object> get(@RequestBody AddSoccerFieldRequestBody requestBody) {
        if (soccerFieldRepository.existsByName(requestBody.name))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
                    "The field name cannot be used"));
        soccerFieldRepository.save(requestBody.getSoccerFieldInstance());
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }
}

package com.ser515.soccer.rest;

import com.ser515.soccer.database.datamodel.User;
import com.ser515.soccer.database.repository.UserRepository;
import com.ser515.soccer.rest.datamodel.*;
import com.ser515.soccer.security.jwt.JwtUtils;
import com.ser515.soccer.security.services.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping(value = "/rest/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserAPI {
    final AuthenticationManager authenticationManager;
    final JwtUtils jwtUtils;
    final PasswordEncoder encoder;

    final UserRepository userRepository;

    public UserAPI(AuthenticationManager authenticationManager, JwtUtils jwtUtils, PasswordEncoder encoder,
                   UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.encoder = encoder;
        this.userRepository = userRepository;
    }

    @Operation(description = "Register a user with user information")
    @PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIResponseBody> signUp(@RequestBody SignUpRequestBody requestBody) {
        if (userRepository.existsByEmailAddress(requestBody.email))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
                    "The e-mail address is already used"));

        User user = new User();
        user.setFirstName(requestBody.firstName);
        user.setLastName(requestBody.lastName);
        user.setPassword(encoder.encode(requestBody.password));
        user.setEmailAddress(requestBody.email);
        user.setRole(requestBody.role);
        userRepository.save(user);

        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }

    @Operation(description = "Authenticate a user based on username and password and return a JWT")
    @PostMapping(value = "/signin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIResponseBody> signin(@RequestBody SignInRequestBody requestBody) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestBody.username, requestBody.password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        SignInResponseBody responseBody = new SignInResponseBody();
        responseBody.firstName = userDetails.getFirstName();
        responseBody.lastName = userDetails.getLastName();
        responseBody.eMailAddress = userDetails.getEMailAddress();
        responseBody.role = userDetails.getRole().toString();
        responseBody.jwt = jwtUtils.generateJwtToken(userDetails.getUsername(),
                userDetails.getRole() != User.Role.SYSTEM);

        return ResponseEntity.ok().body(APIResponseBody.success(responseBody));
    }
}

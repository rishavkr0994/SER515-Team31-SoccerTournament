package com.ser515.soccer.rest;

import com.ser515.soccer.database.datamodel.User;
import com.ser515.soccer.database.repository.UserRepository;
import com.ser515.soccer.rest.datamodel.*;
import com.ser515.soccer.security.jwt.JwtUtils;
import com.ser515.soccer.security.services.UserDetailsImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Api(value="User API", description="Rest APIs For User Management")
@RestController @RequestMapping("/rest/user")
public class UserAPI {
    @Autowired AuthenticationManager authenticationManager;
    @Autowired JwtUtils jwtUtils;
    @Autowired PasswordEncoder encoder;

    @Autowired UserRepository userRepository;

    @ApiOperation(value = "Register a user with user information")
    @PostMapping("/signup")
    public ResponseEntity<APIResponseBody> signUp(@RequestBody SignUpRequestBody requestBody) {
        if (userRepository.existsByEmailAddress(requestBody.email))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure("The e-mail address is already used"));

        User user = new User();
        user.setFirstName(requestBody.firstName);
        user.setLastName(requestBody.lastName);
        user.setPassword(encoder.encode(requestBody.password));
        user.setEmailAddress(requestBody.email);
        user.setRole(requestBody.role);
        userRepository.save(user);

        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }

    @ApiOperation(value = "Authenticate a user based on username and password and return a JWT")
    @PostMapping("/signin")
    public ResponseEntity<APIResponseBody> signin(@RequestBody SignInRequestBody requestBody) {
//        requestBody.password = encoder.encode(requestBody.password);
//        System.out.println(requestBody.password);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestBody.username, requestBody.password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        SignInResponseBody responseBody = new SignInResponseBody();
        responseBody.firstName = userDetails.getFirstName();
        responseBody.lastName = userDetails.getLastName();
        responseBody.eMailAddress = userDetails.getEMailAddress();
        if (roles.size() != 0)
            responseBody.role = roles.get(0);
        responseBody.jwt = jwt;

        return ResponseEntity.ok().body(APIResponseBody.success(responseBody));
    }
}

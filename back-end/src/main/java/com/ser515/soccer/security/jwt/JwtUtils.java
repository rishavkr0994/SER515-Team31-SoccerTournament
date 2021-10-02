package com.ser515.soccer.security.jwt;

import com.ser515.soccer.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    @Value("${soccer.security.jwtSecret}")
    private String jwtSecret;

    @Value("${soccer.security.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (Exception e) { return false; }

        /* Details of various exceptions which can be thrown when validating the JWT Token
         * SignatureException       -> Invalid JWT signature
         * MalformedJwtException    -> Invalid JWT token
         * ExpiredJwtException      -> JWT token is expired
         * UnsupportedJwtException  -> JWT token is unsupported
         * IllegalArgumentException -> JWT claims string is empty */
    }
}

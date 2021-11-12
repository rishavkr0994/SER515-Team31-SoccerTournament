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

    public String generateJwtToken(String username, boolean isSetExpiration) {
        JwtBuilder jwtBuilder = Jwts.builder().setSubject(username).setIssuedAt(new Date());
        if (isSetExpiration)
            jwtBuilder.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs));
        return jwtBuilder.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
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

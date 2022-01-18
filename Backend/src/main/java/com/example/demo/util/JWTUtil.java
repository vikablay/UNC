package com.example.demo.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Date;
import java.util.stream.Collectors;

@NoArgsConstructor
public class JWTUtil {
    public static final String ISSUER_NAME = "UNC";
    public static final String SECRET = "SecretCombination";

    public static String getAccessToken(User user) {
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Expires at 1 hour
                .withIssuer(ISSUER_NAME)
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(Algorithm.HMAC256(SECRET.getBytes()));
    }

    public static String getRefreshToken(User user) {
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 600)) // Expires at 10 hours
                .withIssuer(ISSUER_NAME)
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(Algorithm.HMAC256(SECRET.getBytes()));
    }

    public static DecodedJWT decodeToken(String token) {
        return JWT.require(Algorithm.HMAC256(SECRET.getBytes())).build().verify(token);
    }
}
package com.mycompany.demo.jwt.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mycompany.demo.database.entity.Member;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class JwtService {

    private final SecretKey secretKey;

    public JwtService(@Value("${jwt.secret.key}") String jwtSecretKey) throws Exception {
        log.info(jwtSecretKey);
        byte[] bytes = jwtSecretKey.getBytes("UTF-8");
        secretKey = Keys.hmacShaKeyFor(bytes);
    }

    public String createJwt(Member member) {
        Date date = new Date(new Date().getTime() + 1000 * 1 * 60 * 60 * 24 * 365);

        String jwt = Jwts.builder()
                .subject(member.getMemberId())
                .claim("email", member.getEmail())
                .expiration(date)
                .signWith(secretKey)
                .compact();
        return jwt;
    }

    public void validateJwt(String jwt) {
        JwtParser jwtParser = Jwts.parser()
                .verifyWith(secretKey)
                .build();

        Jws<Claims> jws = jwtParser.parseSignedClaims(jwt);
    }

    public Map<String, String> getClaims(String jwt) {
        JwtParser jwtParser = Jwts.parser()
                .verifyWith(secretKey)
                .build();

        Jws<Claims> jws = jwtParser.parseSignedClaims(jwt);
        Claims claims = jws.getPayload();

        Map<String, String> map = new HashMap<>();
        map.put("memberId", claims.getSubject());
        map.put("email", claims.get("email").toString());

        return map;
    }
}

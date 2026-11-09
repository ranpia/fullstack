package com.mycompany.demo.jwt.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mycompany.demo.database.entity.Member;
import com.mycompany.demo.jwt.dto.LoginRequest;
import com.mycompany.demo.jwt.dto.LoginResponse;
import com.mycompany.demo.jwt.dto.OrderRequest;
import com.mycompany.demo.jwt.dto.OrderResponse;
import com.mycompany.demo.jwt.service.JwtService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/jwt")
@RestController
public class JwtController {

    private final JwtService jwtService;
    // private final JwtMemberService memberService;

    public JwtController(JwtService jwtService){
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        Member member = new Member();
        member.setMemberId("user1");
        member.setEmail("user1@mycompany.com");
        return new LoginResponse("success", jwtService.createJwt(member));
    }

    @PostMapping("/order")
    public OrderResponse order(@RequestBody OrderRequest orderRequest) {
        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setStatus("fail");
        try {
            // 유효성 검사
            String jwt = orderRequest.getJwt();
            jwtService.validateJwt(jwt);
            orderResponse.setStatus("success");
            orderResponse.setMessage("유효코드");

            String memberId = jwtService.getClaims(jwt).get("memberId");
            String email = jwtService.getClaims(jwt).get("email");

            log.info("memberId: "+memberId);
            log.info("email: "+email);
        } catch (SignatureException e) {
            orderResponse.setMessage("jwt 복호화 불가");
        } catch (ExpiredJwtException e) {
            orderResponse.setMessage("jwt 만료됨");
        } catch (MalformedJwtException e) {
            orderResponse.setMessage("jwt 형식이 올바르지 않음");
        } catch (JwtException e) {
            orderResponse.setMessage("jwt 오류");
        } 
        return orderResponse;
    }
    

}

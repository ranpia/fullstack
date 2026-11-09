package com.mycompany.demo.exception;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handlerResponseStatusException(ResponseStatusException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("status", "fail");
        map.put("message", e.getReason());
        return ResponseEntity.status(e.getStatusCode()).headers(e.getHeaders()).body(map);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Map<String, Object>> handlerNoResourceFoundException(NoResourceFoundException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("status", "fail");
        map.put("message", "잘못된 경로입니다.");
        map.put("methodName", "handleNoResourceFoundException");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
    }

    @ExceptionHandler(NoAccountException.class)
    public ResponseEntity<Map<String, Object>> handlerNoAccountExceptionException(NoAccountException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("status", "fail");
        map.put("message", e.getMessage());
        map.put("methodName", "handleNoAccountExceptionException");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
    }

    @ExceptionHandler(DuplicatedMemberIdException.class)
    public ResponseEntity<Map<String, Object>> handlerDuplicatedMemberIdException(DuplicatedMemberIdException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("status", "fail");
        map.put("message", e.getMessage());
        map.put("methodName", "handleDuplicatedMemberIdException");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<Map<String, Object>> handlerSQLException(SQLException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("status", "fail");
        map.put("message", e.getMessage());
        map.put("methodName", "handleSQLException");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<Map<String, Object>> handlerNullPointerException(NullPointerException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("status", "fail");
        map.put("message", e.getMessage());
        map.put("methodName", "handleNullPointerException");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handlerException(Exception e) {
        Map<String, Object> map = new HashMap<>();
        map.put("status", "fail");
        map.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
    }

}

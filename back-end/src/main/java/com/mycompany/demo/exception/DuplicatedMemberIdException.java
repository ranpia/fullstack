package com.mycompany.demo.exception;

public class DuplicatedMemberIdException extends RuntimeException {
    public DuplicatedMemberIdException() {
    }

    public DuplicatedMemberIdException(String message) {
        super(message);
    }

}

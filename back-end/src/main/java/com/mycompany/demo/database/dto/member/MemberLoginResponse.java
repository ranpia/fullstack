package com.mycompany.demo.database.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class MemberLoginResponse {
    private String status;
    private String message;
    private String memberId;
    private String jwt;
}

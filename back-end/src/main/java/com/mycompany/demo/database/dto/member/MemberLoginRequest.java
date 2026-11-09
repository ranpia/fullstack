package com.mycompany.demo.database.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class MemberLoginRequest {
    private String memberId;
    private String password;
}

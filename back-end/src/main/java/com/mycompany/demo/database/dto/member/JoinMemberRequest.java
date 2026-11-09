package com.mycompany.demo.database.dto.member;

import lombok.Data;
import lombok.ToString;

@Data
public class JoinMemberRequest {
    private String memberId;
    private String memberName;
    @ToString.Exclude
    private String password;
    private String email;
}

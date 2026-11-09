package com.mycompany.demo.database.dto.member;

import lombok.Data;
import lombok.ToString;

@Data
public class UpdateMemberRequest {
    private String memberId;
    private String email;
    @ToString.Exclude
    private String password;
}

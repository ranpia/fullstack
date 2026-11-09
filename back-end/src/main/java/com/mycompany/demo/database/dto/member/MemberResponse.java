package com.mycompany.demo.database.dto.member;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data 
@Builder 
public class MemberResponse {
    private String memberId;
    private String memberName;
    private String email;
    private Date joinedAt;


}

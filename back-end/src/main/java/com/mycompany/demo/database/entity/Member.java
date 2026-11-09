package com.mycompany.demo.database.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * member 테이블의 회원 정보.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    private String memberId;
    private String memberName;
    @ToString.Exclude
    private String password;
    private String email;
    private Date joinedAt;
}

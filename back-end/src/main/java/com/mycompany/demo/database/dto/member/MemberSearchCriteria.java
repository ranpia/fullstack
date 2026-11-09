package com.mycompany.demo.database.dto.member;

import lombok.Data;

@Data
public class MemberSearchCriteria {
    private int pageNo = 1;
    private String left = "";
    private String right = "";
}

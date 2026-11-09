package com.mycompany.demo.database.dto.member;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeleteMemberResponse {
    private boolean success;
    private int deletedRows;
    private String message;
}

package com.mycompany.demo.database.dto.seller;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class DeleteSellerResponse {
    private int deletedRows;
}

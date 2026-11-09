package com.mycompany.demo.database.dto.product;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class DeleteProductResponse {
    private int deletedRows;
}

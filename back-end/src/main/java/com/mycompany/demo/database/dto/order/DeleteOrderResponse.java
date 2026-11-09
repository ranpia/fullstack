package com.mycompany.demo.database.dto.order;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class DeleteOrderResponse {
    private int deletedRows;
}

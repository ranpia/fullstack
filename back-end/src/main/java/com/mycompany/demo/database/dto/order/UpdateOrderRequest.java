package com.mycompany.demo.database.dto.order;

import lombok.Data;

@Data
public class UpdateOrderRequest {
    private long orderId;
    private String memberId;
}

package com.mycompany.demo.database.dto.order;

import java.util.Date;
import lombok.Data;

@Data
public class CreateOrderRequest {
    private String memberId;
    private Date orderedAt;
}

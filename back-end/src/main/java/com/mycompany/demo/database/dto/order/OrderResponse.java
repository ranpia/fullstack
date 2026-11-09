package com.mycompany.demo.database.dto.order;

import java.util.Date;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class OrderResponse {
    private long orderId;
    private String memberId;
    private Date orderedAt;
}

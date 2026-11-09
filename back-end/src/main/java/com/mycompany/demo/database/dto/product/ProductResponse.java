package com.mycompany.demo.database.dto.product;

import java.math.BigDecimal;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ProductResponse {
    private long productId;
    private String productName;
    private BigDecimal price;
    private long sellerId;
}

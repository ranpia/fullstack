package com.mycompany.demo.database.dto.product;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class UpdateProductRequest {
    private long productId;
    private String productName;
    private BigDecimal price;
    private long sellerId;
}

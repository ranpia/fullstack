package com.mycompany.demo.database.dto.product;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class CreateProductRequest {
    private String productName;
    private BigDecimal price;
    private long sellerId;
}

package com.mycompany.demo.database.entity;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * product 테이블의 상품 정보.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private long productId;
    private String productName;
    private BigDecimal price;
    private long sellerId;
}

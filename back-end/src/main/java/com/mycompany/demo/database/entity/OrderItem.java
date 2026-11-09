package com.mycompany.demo.database.entity;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * order_item 테이블의 주문 상품 정보. orderId와 productId가 복합 기본키이다.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    private long orderId;
    private long productId;
    private int quantity;
    private BigDecimal unitPrice;
}

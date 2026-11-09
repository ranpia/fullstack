package com.mycompany.demo.database.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * orders 테이블의 주문 정보.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Orders {
    private long orderId;
    private String memberId;
    private Date orderedAt;
}

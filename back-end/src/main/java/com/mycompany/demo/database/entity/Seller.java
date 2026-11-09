package com.mycompany.demo.database.entity;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * seller 테이블의 판매자 정보.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Seller {
    private long sellerId;
    private String sellerName;
    private String email;
    private String phone;
    private Date registeredAt;
}

package com.mycompany.demo.database.dto.seller;

import java.sql.Date;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class SellerResponse {
    private long sellerId;
    private String sellerName;
    private String email;
    private String phone;
    private Date registeredAt;
}

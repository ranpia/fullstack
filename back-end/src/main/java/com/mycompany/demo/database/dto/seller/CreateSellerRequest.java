package com.mycompany.demo.database.dto.seller;

import java.sql.Date;
import lombok.Data;

@Data
public class CreateSellerRequest {
    private String sellerName;
    private String email;
    private String phone;
    private Date registeredAt;
}

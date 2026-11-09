package com.mycompany.demo.database.dto.seller;

import lombok.Data;

@Data
public class SellerSearchCriteria {
    private int pageNo = 1;
    private String left = "";
    private String right = "";
}

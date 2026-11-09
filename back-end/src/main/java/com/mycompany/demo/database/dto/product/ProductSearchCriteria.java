package com.mycompany.demo.database.dto.product;

import lombok.Data;

@Data
public class ProductSearchCriteria {
    private int pageNo = 1;
    private String left = "";
    private String right = "";
}

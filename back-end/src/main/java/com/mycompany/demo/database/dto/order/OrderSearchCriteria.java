package com.mycompany.demo.database.dto.order;

import lombok.Data;

@Data
public class OrderSearchCriteria {
    private int pageNo = 1;
    private String left = "";
    private String right = "";
}

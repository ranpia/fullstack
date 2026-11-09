package com.mycompany.demo.database.dto.review;

import lombok.Data;

@Data
public class ReviewSearchCriteria {
    private int pageNo = 1;
    private int rowsPerPage = 10;
    private String writer;
    private Long productId;
    private String title;
    private String content;
}

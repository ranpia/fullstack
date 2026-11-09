package com.mycompany.demo.database.dto.review;

import java.util.Date;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ReviewResponse {
    private long reviewId;
    private String title;
    private String content;
    private String writer;
    private Date date;
    private long productId;
    private String fileName;
    private String fileType;
}

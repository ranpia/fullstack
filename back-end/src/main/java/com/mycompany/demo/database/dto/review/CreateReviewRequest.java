package com.mycompany.demo.database.dto.review;

import java.util.Date;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateReviewRequest {
    private String title;
    private String content;
    private String writer;
    private Date date;
    private long productId;
    private MultipartFile file;
}

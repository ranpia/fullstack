package com.mycompany.demo.database.dto.review;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateReviewRequest {
    private long reviewId;
    private String title;
    private String content;
    private String writer;
    private long productId;
    private MultipartFile file;
    private String fileName;
    private String fileType;
}

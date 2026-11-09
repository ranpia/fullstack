package com.mycompany.demo.database.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * review 테이블의 상품 후기 게시물 정보.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    private long reviewId;
    private String title;
    private String content;
    private String writer;
    private Date date;
    private long productId;
    private String fileName;
    private String fileType;
    private byte[] fileData;

    public Review(long reviewId, String title, String content, String writer, Date date, long productId) {
        this(reviewId, title, content, writer, date, productId, null, null, null);
    }
}

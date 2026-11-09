package com.mycompany.demo.database.dto.review;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class ReviewResultResponse {
    private String status;
    private String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long reviewId;
}
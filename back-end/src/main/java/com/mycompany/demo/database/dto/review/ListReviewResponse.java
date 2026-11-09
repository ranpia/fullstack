package com.mycompany.demo.database.dto.review;

import java.util.Date;
import java.util.List;
import com.mycompany.demo.database.dto.common.Pager;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ListReviewResponse {
    private Pager pager;
    private List<Item> list;

    @Data
    @Builder
    public static class Item {
        private long reviewId;
        private String title;
        private String writer;
        private Date date;
        private long productId;
        private String fileName;
        private String fileType;
    }
}

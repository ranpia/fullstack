package com.mycompany.demo.database.dto.product;

import java.util.List;
import com.mycompany.demo.database.dto.common.Pager;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ListProductResponse {
    private Pager pager;
    private List<ProductResponse> list;
}

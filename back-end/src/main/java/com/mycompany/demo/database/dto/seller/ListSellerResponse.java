package com.mycompany.demo.database.dto.seller;

import java.util.List;
import com.mycompany.demo.database.dto.common.Pager;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ListSellerResponse {
    private Pager pager;
    private List<SellerResponse> list;
}

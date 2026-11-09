package com.mycompany.demo.database.dto.order;

import java.util.List;
import com.mycompany.demo.database.dto.common.Pager;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ListOrderResponse {
    private Pager pager;
    private List<OrderResponse> list;
}

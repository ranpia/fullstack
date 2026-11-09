package com.mycompany.demo.database;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.mycompany.demo.database.controller.OrdersController;
import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Orders;
import com.mycompany.demo.database.service.OrderService;

class OrderControllerTest {
    @Test
    void mapsOrderRequestsAndResponsesAndChecksHttpErrors() throws Exception {
        OrderService service = mock(OrderService.class);
        Orders stored = new Orders(42, "user1", new Date(1000));
        when(service.createOrder(any())).thenReturn(stored);
        when(service.getOrder(42L)).thenReturn(stored);
        when(service.updateOrder(any())).thenReturn(1);
        when(service.deleteOrder(42L)).thenReturn(1);
        when(service.getOrderPager(any())).thenReturn(new Pager(10, 5, 1, 1));
        when(service.listOrder(any(), any())).thenReturn(List.of(stored));
        var mvc = MockMvcBuilders.standaloneSetup(new OrdersController(service))
                .defaultRequest(get("/").accept(MediaType.APPLICATION_JSON)).build();

        mvc.perform(post("/database/create-order").contentType(MediaType.APPLICATION_JSON)
                .content("{\"memberId\":\"user1\"}")).andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").value(42))
                .andExpect(jsonPath("$.orderedAt").value(1000));
        verify(service).createOrder(argThat(order -> order.getOrderId() == 0
                && order.getMemberId().equals("user1") && order.getOrderedAt() == null));
        mvc.perform(put("/database/update-order").contentType(MediaType.APPLICATION_JSON)
                .content("{\"orderId\":42,\"memberId\":\"user1\"}")).andExpect(status().isOk())
                .andExpect(jsonPath("$.orderedAt").value(1000));
        mvc.perform(get("/database/list-order").param("left", "memberId").param("right", "user1"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.list[0].orderId").value(42));
        verify(service).getOrderPager(argThat(criteria -> criteria.getLeft().equals("memberId")
                && criteria.getRight().equals("user1") && criteria.getPageNo() == 1));
        mvc.perform(delete("/database/delete-order").param("orderId", "42"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.deletedRows").value(1));
        mvc.perform(get("/database/list-order").param("pageNo", "0")).andExpect(status().isBadRequest());
        mvc.perform(get("/database/get-order").param("orderId", "999")).andExpect(status().isNotFound());
        mvc.perform(delete("/database/delete-order").param("orderId", "999")).andExpect(status().isNotFound());
        verify(service, times(1)).getOrderPager(any());
    }
}

package com.mycompany.demo.database.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.mycompany.demo.database.dto.order.*;
import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Orders;
import com.mycompany.demo.database.service.OrderService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/database")
@RequiredArgsConstructor
public class OrdersController {
    private final OrderService orderService;

    @GetMapping("/get-order")
    public OrderResponse getOrder(@RequestParam("orderId") Long orderId) {
        Orders order = orderService.getOrder(orderId);
        if (order == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Orders not found");
        }
        return OrderResponse.builder()
                .orderId(order.getOrderId())
                .memberId(order.getMemberId())
                .orderedAt(order.getOrderedAt())
                .build();
    }

    @PostMapping("/create-order")
    public OrderResponse createOrder(@RequestBody CreateOrderRequest request) {
        Orders order = new Orders();
        order.setMemberId(request.getMemberId());
        order.setOrderedAt(request.getOrderedAt());
        Orders created = orderService.createOrder(order);
        if (created == null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Order creation failed");
        }
        return OrderResponse.builder()
                .orderId(created.getOrderId())
                .memberId(created.getMemberId())
                .orderedAt(created.getOrderedAt())
                .build();
    }

    @PutMapping("/update-order")
    public OrderResponse updateOrder(@RequestBody UpdateOrderRequest request) {
        Orders order = new Orders();
        order.setOrderId(request.getOrderId());
        order.setMemberId(request.getMemberId());
        if (orderService.updateOrder(order) == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Orders not found");
        }
        Orders updated = orderService.getOrder((long) order.getOrderId());
        if (updated == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Orders not found");
        }
        return OrderResponse.builder()
                .orderId(updated.getOrderId())
                .memberId(updated.getMemberId())
                .orderedAt(updated.getOrderedAt())
                .build();
    }

    @DeleteMapping("/delete-order")
    public DeleteOrderResponse deleteOrder(@RequestParam("orderId") Long orderId) {
        int rows = orderService.deleteOrder(orderId);
        if (rows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Orders not found");
        }
        return DeleteOrderResponse.builder().deletedRows(rows).build();
    }

    @GetMapping("/list-order")
    public ListOrderResponse listOrder(@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(value = "left", defaultValue = "") String left,
            @RequestParam(value = "right", defaultValue = "") String right) {
        if (pageNo < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "pageNo must be positive");
        }
        OrderSearchCriteria criteria = new OrderSearchCriteria();
        criteria.setPageNo(pageNo);
        criteria.setLeft(left);
        criteria.setRight(right);
        Pager pager = orderService.getOrderPager(criteria);
        return ListOrderResponse.builder()
                .pager(pager)
                .list(orderService.listOrder(criteria, pager).stream()
                        .map(order -> OrderResponse.builder()
                                .orderId(order.getOrderId())
                                .memberId(order.getMemberId())
                                .orderedAt(order.getOrderedAt())
                                .build())
                        .toList())
                .build();
    }
}

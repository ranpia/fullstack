package com.mycompany.demo.database.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;
import com.mycompany.demo.database.dto.common.Pager;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import com.mycompany.demo.database.dao.OrderItemDao;
import com.mycompany.demo.database.entity.OrderItem;

@RestController
@RequestMapping("/database")
@RequiredArgsConstructor
public class OrderItemController {
    private final OrderItemDao orderItemDao;

    @GetMapping("/get-order-item")
    public OrderItem get(@RequestParam("orderId") long orderId, @RequestParam("productId") long productId) {
        OrderItem key = new OrderItem();
        key.setOrderId(orderId);
        key.setProductId(productId);
        OrderItem value = orderItemDao.selectByOrderIdAndProductId(key);
        if (value == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "OrderItem not found");
        }
        return value;
    }

    @PostMapping("/create-order-item")
    @Transactional
    public OrderItem create(@RequestBody OrderItem value) {
        orderItemDao.insert(value);
        return orderItemDao.selectByOrderIdAndProductId(value);
    }

    @PutMapping("/update-order-item")
    @Transactional
    public OrderItem update(@RequestBody OrderItem value) {
        if (orderItemDao.update(value) == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "OrderItem not found");
        }
        return orderItemDao.selectByOrderIdAndProductId(value);
    }

    @DeleteMapping("/delete-order-item")
    public Map<String, Integer> delete(@RequestParam("orderId") long orderId, @RequestParam("productId") long productId) {
        OrderItem key = new OrderItem();
        key.setOrderId(orderId);
        key.setProductId(productId);
        int rows = orderItemDao.deleteByOrderIdAndProductId(key);
        if (rows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "OrderItem not found");
        }
        return Map.of("deletedRows", rows);
    }

    @GetMapping("/list-order-item")
    public Map<String, Object> list(@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(value = "left", defaultValue = "") String left,
            @RequestParam(value = "right", defaultValue = "") String right) {
        if (pageNo < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "pageNo must be positive");
        }
        Map<String, Object> where = left.isBlank() || right.isBlank() ? Map.of() : Map.of(left, right);
        int totalRows = orderItemDao.selectCount(where);
        Pager pager = new Pager(10, 5, totalRows, pageNo);
        List<OrderItem> list = orderItemDao.selectByPage(pager, where);
        return Map.of("pager", pager, "list", list);
    }
}

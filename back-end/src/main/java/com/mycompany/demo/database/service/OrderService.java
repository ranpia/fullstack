package com.mycompany.demo.database.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.mycompany.demo.database.dao.OrdersDao;
import com.mycompany.demo.database.entity.Orders;
import com.mycompany.demo.database.dto.order.OrderSearchCriteria;
import com.mycompany.demo.database.dto.common.Pager;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrdersDao ordersDao;

    public Orders getOrder(Long orderId) {
        return ordersDao.selectByOrderId(orderId);
    }

    @Transactional
    public Orders createOrder(Orders order) {
        if (ordersDao.insert(order) != 1) {
            return null;
        }
        return getOrder((long) order.getOrderId());
    }

    @Transactional
    public int updateOrder(Orders request) {
        Orders order = getOrder((long) request.getOrderId());
        if (order == null) {
            return 0;
        }
        order.setMemberId(request.getMemberId());
        return ordersDao.update(order);
    }

    public int deleteOrder(Long orderId) {
        return ordersDao.deleteByOrderId(orderId);
    }

    public Pager getOrderPager(OrderSearchCriteria criteria) {
        int totalRows = ordersDao.selectCount(filter(criteria));
        return new Pager(10, 5, totalRows, criteria.getPageNo());
    }

    public List<Orders> listOrder(OrderSearchCriteria criteria, Pager pager) {
        return ordersDao.selectByPage(pager, filter(criteria));
    }

    private Map<String, Object> filter(OrderSearchCriteria criteria) {
        return criteria.getLeft().isBlank() || criteria.getRight().isBlank()
                ? Map.of() : Map.of(criteria.getLeft(), criteria.getRight());
    }
}

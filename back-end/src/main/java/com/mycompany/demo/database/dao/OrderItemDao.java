package com.mycompany.demo.database.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.OrderItem;

@Mapper
public interface OrderItemDao {
    int insert(OrderItem orderItem);

    OrderItem selectByOrderIdAndProductId(OrderItem orderItem);

    int selectCount(@Param("where") Map<String, Object> where);

    List<OrderItem> selectByPage(@Param("pager") Pager pager, @Param("where") Map<String, Object> where);

    int update(OrderItem orderItem);

    int deleteByOrderIdAndProductId(OrderItem orderItem);
}

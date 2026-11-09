package com.mycompany.demo.database.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Orders;

@Mapper
public interface OrdersDao {
    int insert(Orders orders);

    Orders selectByOrderId(@Param("orderId") Long orderId);

    int selectCount(@Param("where") Map<String, Object> where);

    List<Orders> selectByPage(@Param("pager") Pager pager, @Param("where") Map<String, Object> where);

    int update(Orders orders);

    int deleteByOrderId(@Param("orderId") Long orderId);
}

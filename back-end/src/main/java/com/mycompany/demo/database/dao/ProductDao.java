package com.mycompany.demo.database.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Product;

@Mapper
public interface ProductDao {
    int insert(Product product);

    Product selectByProductId(@Param("productId") Long productId);

    int selectCount(@Param("where") Map<String, Object> where);

    List<Product> selectByPage(@Param("pager") Pager pager, @Param("where") Map<String, Object> where);

    int update(Product product);

    int deleteByProductId(@Param("productId") Long productId);
}

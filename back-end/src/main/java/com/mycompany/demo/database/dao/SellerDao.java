package com.mycompany.demo.database.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Seller;

@Mapper
public interface SellerDao {
    int insert(Seller seller);

    Seller selectBySellerId(@Param("sellerId") Long sellerId);

    int selectCount(@Param("where") Map<String, Object> where);

    List<Seller> selectByPage(@Param("pager") Pager pager, @Param("where") Map<String, Object> where);

    int update(Seller seller);

    int deleteBySellerId(@Param("sellerId") Long sellerId);
}

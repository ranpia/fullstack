package com.mycompany.demo.database.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Review;

@Mapper
public interface ReviewDao {
    int insert(Review review);

    Review selectByReviewId(@Param("reviewId") long reviewId);

    int selectCount(@Param("where") Map<String, Object> where);

    List<Review> selectByPage(@Param("pager") Pager pager, @Param("where") Map<String, Object> where);

    int update(Review review);

    int deleteByReviewId(@Param("reviewId") long reviewId);
}

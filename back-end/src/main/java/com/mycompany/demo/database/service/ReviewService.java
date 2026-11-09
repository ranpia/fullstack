package com.mycompany.demo.database.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mycompany.demo.database.dao.ReviewDao;
import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.dto.review.ReviewSearchCriteria;
import com.mycompany.demo.database.entity.Review;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewDao reviewDao;

    public Review getReview(long reviewId) {
        return reviewDao.selectByReviewId(reviewId);
    }

    @Transactional
    public Review createReview(Review review) {
        if (reviewDao.insert(review) != 1) {
            return null;
        }
        return getReview(review.getReviewId());
    }

    @Transactional
    public int updateReview(Review request) {
        Review review = getReview(request.getReviewId());
        if (review == null) {
            return 0;
        }
        review.setTitle(request.getTitle());
        review.setContent(request.getContent());
        review.setWriter(request.getWriter());
        review.setProductId(request.getProductId());
        review.setFileName(request.getFileName());
        review.setFileType(request.getFileType());
        review.setFileData(request.getFileData());
        return reviewDao.update(review);
    }

    public int deleteReview(long reviewId) {
        return reviewDao.deleteByReviewId(reviewId);
    }

    public Pager getReviewPager(ReviewSearchCriteria criteria) {
        int totalRows = reviewDao.selectCount(reviewFilter(criteria));
        return new Pager(criteria.getRowsPerPage(), 5, totalRows, criteria.getPageNo());
    }

    public List<Review> listReview(ReviewSearchCriteria criteria, Pager pager) {
        return reviewDao.selectByPage(pager, reviewFilter(criteria));
    }

    private Map<String, Object> reviewFilter(ReviewSearchCriteria criteria) {
        Map<String, Object> where = new HashMap<>();
        where.put("writer", criteria.getWriter());
        where.put("productId", criteria.getProductId());
        where.put("title", criteria.getTitle());
        where.put("content", criteria.getContent());
        return where;
    }
}

package com.mycompany.demo.database;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.mycompany.demo.database.controller.ReviewController;
import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Review;
import com.mycompany.demo.database.service.ReviewService;

class ReviewControllerTest {
    @Test
    void requestDtosKeepRoutesAndMapServiceResultsToResponses() throws Exception {
        ReviewService service = mock(ReviewService.class);
        Review review = new Review(42, "review", "content", "member", null, 7);
        when(service.getReview(42)).thenReturn(review);
        when(service.createReview(any())).thenReturn(review);
        when(service.updateReview(any())).thenReturn(1);
        when(service.deleteReview(42)).thenReturn(1);
        when(service.getReviewPager(any())).thenReturn(new Pager(10, 5, 1, 1));
        when(service.listReview(any(), any())).thenReturn(List.of(review));
        var mvc = MockMvcBuilders.standaloneSetup(new ReviewController(service))
                .defaultRequest(get("/").accept(MediaType.APPLICATION_JSON)).build();

        mvc.perform(get("/review/get-review").param("reviewId", "42"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.reviewId").value(42));
        mvc.perform(multipart(org.springframework.http.HttpMethod.POST, "/review/create-review")
                .param("reviewId", "42").param("title", "review").param("content", "content")
                .param("writer", "member").param("productId", "7"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("success"));
        verify(service).createReview(argThat(value -> value.getReviewId() == 0
                && value.getTitle().equals("review") && value.getWriter().equals("member")
                && value.getContent().equals("content") && value.getProductId() == 7));
        mvc.perform(multipart(org.springframework.http.HttpMethod.PUT, "/review/update-review")
                .param("reviewId", "42").param("title", "review").param("content", "content")
                .param("writer", "member").param("productId", "7"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("success"));
        verify(service).updateReview(argThat(value -> value.getReviewId() == 42 && value.getProductId() == 7));
        mvc.perform(post("/review/list-review").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsBytes(java.util.Map.of("pageNo", "1", "rowsPerPage", "20", "writer", "member", "productId", "7", "title", "review", "content", "fragment"))))
                .andExpect(status().isOk()).andExpect(jsonPath("$.pager.totalRows").value(1))
                .andExpect(jsonPath("$.list[0].reviewId").value(42))
                .andExpect(jsonPath("$.list[0].length()").value(7))
                .andExpect(jsonPath("$.list[0]", org.hamcrest.Matchers.not(org.hamcrest.Matchers.hasKey("content"))))
                .andExpect(jsonPath("$.list[0]", org.hamcrest.Matchers.not(org.hamcrest.Matchers.hasKey("fileData"))));
        verify(service).getReviewPager(argThat(value -> value.getPageNo() == 1 && value.getRowsPerPage() == 20
                && value.getWriter().equals("member") && value.getProductId() == 7
                && value.getTitle().equals("review") && value.getContent().equals("fragment")));
        mvc.perform(post("/review/list-review").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content("{}")).andExpect(status().isOk());
        verify(service).getReviewPager(argThat(value -> value.getRowsPerPage() == 10 && value.getWriter() == null
                && value.getProductId() == null && value.getTitle() == null && value.getContent() == null));
        mvc.perform(delete("/review/delete-review").param("reviewId", "42"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.reviewId").value(42));
        mvc.perform(get("/review/get-review").param("reviewId", "99")).andExpect(status().isNotFound());
        mvc.perform(post("/review/list-review").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsBytes(java.util.Map.of("pageNo", "0")))).andExpect(status().isBadRequest());
        mvc.perform(post("/review/list-review").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsBytes(java.util.Map.of("rowsPerPage", "0")))).andExpect(status().isBadRequest());
        mvc.perform(post("/review/list-review").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsBytes(java.util.Map.of("rowsPerPage", "-1")))).andExpect(status().isBadRequest());
        mvc.perform(delete("/review/delete-review").param("reviewId", "99"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("fail"));
        when(service.getReview(100)).thenThrow(new IllegalStateException("internal database details"));
        mvc.perform(get("/review/get-review").param("reviewId", "100"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value("fail"))
                .andExpect(jsonPath("$.message").value("리뷰 처리 중 오류가 발생했습니다."));
        mvc.perform(post("/review/list-review").contentType(MediaType.APPLICATION_JSON).content("{bad"))
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$.status").value("fail"));
        when(service.createReview(any())).thenReturn(null);
        mvc.perform(multipart(org.springframework.http.HttpMethod.POST, "/review/create-review")
                .param("reviewId", "42").param("title", "review").param("content", "content")
                .param("writer", "member").param("productId", "7"))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.status").value("fail"))
                .andExpect(jsonPath("$.message").isNotEmpty());
        when(service.updateReview(any())).thenReturn(0);
        mvc.perform(multipart(org.springframework.http.HttpMethod.PUT, "/review/update-review")
                .param("reviewId", "42").param("title", "review").param("content", "content")
                .param("writer", "member").param("productId", "7"))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.status").value("fail"))
                .andExpect(jsonPath("$.message").isNotEmpty());
    }
    @Test
    void serviceCalculatesPagerWithRequestedRowsPerPage() {
        var dao = mock(com.mycompany.demo.database.dao.ReviewDao.class);
        when(dao.selectCount(any())).thenReturn(45);
        var service = new ReviewService(dao);
        var criteria = new com.mycompany.demo.database.dto.review.ReviewSearchCriteria();
        criteria.setRowsPerPage(20);
        criteria.setPageNo(2);
        Pager pager = service.getReviewPager(criteria);
        org.assertj.core.api.Assertions.assertThat(pager.getRowsPerPage()).isEqualTo(20);
        org.assertj.core.api.Assertions.assertThat(pager.getTotalPageNo()).isEqualTo(3);
        org.assertj.core.api.Assertions.assertThat(pager.getStartRowIndex()).isEqualTo(20);
    }    @Test
    void acceptsAndReturnsIdsBeyondIntegerRange() throws Exception {
        ReviewService service = mock(ReviewService.class);
        long reviewId = 3_000_000_001L;
        long productId = 3_000_000_002L;
        when(service.getReview(reviewId)).thenReturn(new Review(reviewId, "long ID", "content", "member", null, productId));
        var mvc = MockMvcBuilders.standaloneSetup(new ReviewController(service))
                .defaultRequest(get("/").accept(MediaType.APPLICATION_JSON)).build();
        mvc.perform(get("/review/get-review").param("reviewId", Long.toString(reviewId)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.reviewId").value(reviewId))
                .andExpect(jsonPath("$.productId").value(productId));
    }}

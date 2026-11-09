package com.mycompany.demo.database;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.mycompany.demo.database.controller.ReviewController;
import com.mycompany.demo.database.entity.Review;
import com.mycompany.demo.database.service.ReviewService;

class ReviewImageControllerTest {
    @Test
    void returnsStoredBytesAndImageContentTypeAndReportsMissingOrInvalidFiles() throws Exception {
        ReviewService service = mock(ReviewService.class);
        var mvc = MockMvcBuilders.standaloneSetup(new ReviewController(service))
                .defaultRequest(get("/").accept(org.springframework.http.MediaType.APPLICATION_JSON)).build();
        Review review = new Review();
        byte[] data = java.util.Base64.getDecoder().decode(
                "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aL1sAAAAASUVORK5CYII=");
        review.setFileData(data);
        review.setFileType("image/png");
        review.setFileName("리뷰 이미지.png");
        when(service.getReview(3_000_000_001L)).thenReturn(review);
        mvc.perform(get("/review/get-image").param("reviewId", "3000000001"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("image/png"))
                .andExpect(content().bytes(data))
                .andExpect(header().longValue("Content-Length", data.length))
                .andExpect(result -> {
                    var disposition = org.springframework.http.ContentDisposition.parse(
                            result.getResponse().getHeader("Content-Disposition"));
                    org.assertj.core.api.Assertions.assertThat(disposition.getType()).isEqualTo("attachment");
                    org.assertj.core.api.Assertions.assertThat(disposition.getFilename()).isEqualTo("리뷰 이미지.png");
                });
        mvc.perform(get("/review/get-image").param("reviewId", "99"))
                .andExpect(status().isNotFound()).andExpect(jsonPath("$.status").value("fail"));
        review.setFileData(null);
        mvc.perform(get("/review/get-image").param("reviewId", "3000000001"))
                .andExpect(status().isNotFound());
        review.setFileData(data);
        review.setFileType("application/pdf");
        mvc.perform(get("/review/get-image").param("reviewId", "3000000001"))
                .andExpect(status().isUnsupportedMediaType()).andExpect(jsonPath("$.message").isNotEmpty());
        review.setFileType(null);
        mvc.perform(get("/review/get-image").param("reviewId", "3000000001"))
                .andExpect(status().isUnsupportedMediaType());
    }
}

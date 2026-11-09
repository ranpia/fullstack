package com.mycompany.demo.database;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.mycompany.demo.config.WebConfig;
import com.mycompany.demo.database.controller.ReviewController;
import com.mycompany.demo.database.service.ReviewService;

@WebMvcTest(ReviewController.class)
@Import(WebConfig.class)
class ReviewCorsTest {
    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private ReviewService reviewService;

    @Test
    void allowsFrontendJsonPostPreflight() throws Exception {
        mvc.perform(options("/review/list-review")
                .header("Origin", "http://localhost:3000")
                .header("Access-Control-Request-Method", "POST")
                .header("Access-Control-Request-Headers", "content-type"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"))
                .andExpect(header().string("Access-Control-Allow-Headers", "content-type"));
    }

    @Test
    void rejectsUnconfiguredOrigin() throws Exception {
        mvc.perform(options("/review/list-review")
                .header("Origin", "http://unconfigured.example")
                .header("Access-Control-Request-Method", "POST"))
                .andExpect(status().isForbidden())
                .andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
    }
}

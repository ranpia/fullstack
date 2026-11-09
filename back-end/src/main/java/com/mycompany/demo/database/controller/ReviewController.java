package com.mycompany.demo.database.controller;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.dto.review.CreateReviewRequest;
import com.mycompany.demo.database.dto.review.GetReviewRequest;
import com.mycompany.demo.database.dto.review.DeleteReviewRequest;
import com.mycompany.demo.database.dto.review.ReviewResultResponse;
import com.mycompany.demo.database.dto.review.ListReviewRequest;
import com.mycompany.demo.database.dto.review.ListReviewResponse;
import com.mycompany.demo.database.dto.review.ReviewResponse;
import com.mycompany.demo.database.dto.review.ReviewSearchCriteria;
import com.mycompany.demo.database.dto.review.UpdateReviewRequest;
import com.mycompany.demo.database.entity.Review;
import com.mycompany.demo.database.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping(value = "/list-review", consumes = "application/json", produces = "application/json")
    public ListReviewResponse listReview(@RequestBody ListReviewRequest request) {
        if (request.getPageNo() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "페이지 번호는 1 이상이어야 합니다.");
        }
        if (request.getRowsPerPage() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "페이지당 행 수는 1 이상이어야 합니다.");
        }
        ReviewSearchCriteria criteria = new ReviewSearchCriteria();
        criteria.setPageNo(request.getPageNo());
        criteria.setRowsPerPage(request.getRowsPerPage());
        criteria.setWriter(request.getWriter());
        criteria.setProductId(request.getProductId());
        criteria.setTitle(request.getTitle());
        criteria.setContent(request.getContent());
        Pager pager = reviewService.getReviewPager(criteria);
        return ListReviewResponse.builder()
                .pager(pager)
                .list(reviewService.listReview(criteria, pager).stream()
                        .map(review -> ListReviewResponse.Item.builder()
                                .reviewId(review.getReviewId())
                                .title(review.getTitle())
                                .writer(review.getWriter())
                                .date(review.getDate())
                                .productId(review.getProductId())
                                .fileName(review.getFileName())
                                .fileType(review.getFileType())
                                .build())
                        .toList())
                .build();
    }

    @GetMapping("/get-review")
    public ReviewResponse getReview(@ModelAttribute GetReviewRequest request) {
        Review review = reviewService.getReview(request.getReviewId());
        if (review == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "리뷰를 찾을 수 없습니다.");
        }
        return ReviewResponse.builder()
                .reviewId(review.getReviewId())
                .title(review.getTitle())
                .content(review.getContent())
                .writer(review.getWriter())
                .date(review.getDate())
                .productId(review.getProductId())
                .fileName(review.getFileName())
                .fileType(review.getFileType())
                .build();
    }

    @GetMapping("/get-image")
    public ResponseEntity<byte[]> getReviewImage(@RequestParam("reviewId") long reviewId) {
        Review review = reviewService.getReview(reviewId);
        if (review == null || review.getFileData() == null || review.getFileData().length == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "리뷰 이미지를 찾을 수 없습니다.");
        }
        MediaType mediaType;
        try {
            // 응답 본문에 들어갈 데이터 타입
            mediaType = MediaType.parseMediaType(review.getFileType() == null ? "" : review.getFileType());
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "이미지 형식을 확인할 수 없습니다.");
        }
        if (!"image".equals(mediaType.getType()) || !mediaType.isConcrete()) {
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "이미지 첨부파일이 아닙니다.");
        }
        return ResponseEntity.ok()
                .contentType(mediaType)
                .contentLength(review.getFileData().length)
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()
                        .filename(review.getFileName() == null || review.getFileName().isBlank()
                                ? "review-" + reviewId : review.getFileName(), StandardCharsets.UTF_8)
                        .build().toString())
                // contenttype 을 강제함으로서 보안강화?
                .header("X-Content-Type-Options", "nosniff")
                .body(review.getFileData());
    }

    @PostMapping(value = "/create-review", consumes = "multipart/form-data", produces = "application/json")
    public ReviewResultResponse createReview(@ModelAttribute CreateReviewRequest request) throws IOException {
        Review review = new Review();
        review.setTitle(request.getTitle());
        review.setContent(request.getContent());
        review.setWriter(request.getWriter());
        review.setDate(request.getDate());
        review.setProductId(request.getProductId());
        if (request.getFile() != null && !request.getFile().isEmpty()) {
            review.setFileName(request.getFile().getOriginalFilename());
            review.setFileType(request.getFile().getContentType());
            review.setFileData(request.getFile().getBytes());
        }
        Review createdReview = reviewService.createReview(review);
        if (createdReview == null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "리뷰 생성에 실패했습니다.");
        }
        return ReviewResultResponse.builder()
                .status("success")
                .message("리뷰 생성 성공")
                .reviewId(createdReview.getReviewId())
                .build();
    }

    @PutMapping(value = "/update-review", consumes = "multipart/form-data", produces = "application/json")
    public ReviewResultResponse updateReview(@ModelAttribute UpdateReviewRequest request) throws IOException {
        if (reviewService.getReview(request.getReviewId()) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "리뷰를 찾을 수 없습니다.");
        }
        Review review = new Review();
        review.setReviewId(request.getReviewId());
        if ("Delete".equals(request.getFileName()) && request.getFileType() == null) {
            review.setFileName("Delete");
        }
        review.setTitle(request.getTitle());
        review.setContent(request.getContent());
        review.setWriter(request.getWriter());
        review.setProductId(request.getProductId());
        if (request.getFile() != null && !request.getFile().isEmpty()) {
            review.setFileName(request.getFile().getOriginalFilename());
            review.setFileType(request.getFile().getContentType());
            review.setFileData(request.getFile().getBytes());
        }
        if (reviewService.updateReview(review) != 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "리뷰 수정에 실패했습니다.");
        }
        return ReviewResultResponse.builder()
                .status("success")
                .message("리뷰 수정 성공")
                .reviewId(review.getReviewId())
                .build();
    }

    @DeleteMapping("/delete-review")
    public ReviewResultResponse deleteReview(@ModelAttribute DeleteReviewRequest request) {
        int rows = reviewService.deleteReview(request.getReviewId());
        return ReviewResultResponse.builder()
                .status(rows == 1 ? "success" : "fail")
                .reviewId(request.getReviewId())
                .message(rows == 1 ? "리뷰 삭제 성공" : "리뷰 삭제 실패")
                .build();
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ReviewResultResponse> handleStatusException(ResponseStatusException exception) {
        return ResponseEntity.status(exception.getStatusCode()).body(ReviewResultResponse.builder()
                .status("fail")
                .message(exception.getReason())
                .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ReviewResultResponse> handleException(Exception exception) {
        var status = exception instanceof org.springframework.web.ErrorResponse error
                ? error.getStatusCode()
                : exception instanceof org.springframework.http.converter.HttpMessageNotReadableException
                        ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
        String message = status.is4xxClientError()
                ? "요청 형식이나 입력값을 확인해 주세요." : "리뷰 처리 중 오류가 발생했습니다.";
        return ResponseEntity.status(status).body(ReviewResultResponse.builder()
                .status("fail")
                .message(message)
                .build());
    }
}

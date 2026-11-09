import apiClient from "./axiosConfig";

export function getReviewImageUrl(reviewId) {
  return apiClient.getUri({ url: "/review/get-image", params: { reviewId } });
}

export async function getReviewImage(reviewId, config = {}) {
  const response = await apiClient.get("/review/get-image", {
    ...config,
    params: { reviewId },
    responseType: "blob",
  });
  return response.data;
}

// JSON body: pageNo, rowsPerPage, writer, productId, title, content
export async function listReviews(data = {}, config = {}) {
  const response = await apiClient.post("/review/list-review", data, {
    ...config,
    headers: { ...config.headers, "Content-Type": "application/json" },
  });
  return response.data;
}

export async function getReview(reviewId, config = {}) {
  const response = await apiClient.get("/review/get-review", {
    ...config,
    params: { reviewId },
  });
  return response.data;
}

// FormData: title, content, writer, productId, file(선택)
// Content-Type과 boundary는 브라우저가 설정하므로 직접 지정하지 않습니다.
export async function createReview(data) {
  const response = await apiClient.post("/review/create-review", data);
  return response.data;
}

// FormData: reviewId, title, content, writer, productId, file(선택)
export async function updateReview(data) {
  const response = await apiClient.put("/review/update-review", data);
  return response.data;
}

export async function deleteReview(reviewId) {
  const response = await apiClient.delete("/review/delete-review", {
    data: new URLSearchParams({ reviewId: String(reviewId) }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
}

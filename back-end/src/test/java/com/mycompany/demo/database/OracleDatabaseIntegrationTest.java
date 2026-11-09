package com.mycompany.demo.database;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

import javax.sql.DataSource;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.demo.database.dao.*;
import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.*;

/** Real Oracle integration checks. All test writes are rolled back. */
@SpringBootTest(properties = "openai_api_key=unused-in-database-tests")
@AutoConfigureMockMvc
@Transactional
@EnabledIfEnvironmentVariable(named = "RUN_ORACLE_INTEGRATION_TESTS", matches = "true")
class OracleDatabaseIntegrationTest {
    @Autowired DataSource dataSource;
    @Autowired MemberDao members;
    @Autowired SellerDao sellers;
    @Autowired ProductDao products;
    @Autowired OrdersDao orders;
    @Autowired OrderItemDao items;
    @Autowired ReviewDao boards;
    @Autowired JdbcTemplate jdbc;
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper json;

    @Test
    void allMappersSupportOracleCrudGeneratedKeysAndPagination() throws Exception {
        try (var connection = dataSource.getConnection()) {
            assertThat(connection.getMetaData().getDatabaseProductName()).isEqualTo("Oracle");
        }

        Member member = new Member();
        member.setMemberId("oracle_test_" + UUID.randomUUID().toString().replace("-", ""));
        member.setMemberName("Oracle integration member");
        member.setPassword("test-hash");
        assertThat(members.insert(member)).isEqualTo(1);
        assertThat(members.selectByMemberId(member.getMemberId()).getJoinedAt()).isNotNull();
        member.setMemberName("Updated member");
        assertThat(members.update(member)).isEqualTo(1);
        Map<String, Object> filter = Map.of("memberId", member.getMemberId(), "memberName", "Updated");
        assertThat(members.selectCount(filter)).isEqualTo(1);
        Pager pager = new Pager(5, 5, 50, 1);
        assertThat(members.selectByPage(pager, filter)).extracting(Member::getMemberId)
                .containsExactly(member.getMemberId());
        assertThat(members.selectCount(null)).isPositive();
        assertThat(members.selectByPage(pager, Map.of())).isNotEmpty();

        Seller seller = new Seller();
        seller.setSellerName("Integration seller");
        assertThat(sellers.insert(seller)).isEqualTo(1);
        assertThat(seller.getSellerId()).isPositive();
        assertThat(sellers.selectBySellerId((long) seller.getSellerId()).getRegisteredAt()).isNotNull();
        seller.setPhone("010-0000-9999");
        assertThat(sellers.update(seller)).isEqualTo(1);
        assertThat(sellers.selectByPage(pager, Map.of())).isNotEmpty();

        Product product = new Product();
        product.setProductName("Integration product");
        product.setPrice(new BigDecimal("1200.50"));
        product.setSellerId(seller.getSellerId());
        assertThat(products.insert(product)).isEqualTo(1);
        assertThat(product.getProductId()).isPositive();
        assertThat(products.selectByProductId((long) product.getProductId()).getPrice())
                .isEqualByComparingTo("1200.50");
        product.setPrice(new BigDecimal("1300.50"));
        assertThat(products.update(product)).isEqualTo(1);
        assertThat(products.selectByPage(pager, Map.of())).isNotEmpty();

        Orders order = new Orders();
        order.setMemberId(member.getMemberId());
        assertThat(orders.insert(order)).isEqualTo(1);
        assertThat(order.getOrderId()).isPositive();
        assertThat(orders.selectByOrderId((long) order.getOrderId()).getOrderedAt()).isNotNull();
        assertThat(orders.update(order)).isEqualTo(1);
        assertThat(orders.selectByPage(pager, Map.of())).isNotEmpty();

        OrderItem item = new OrderItem();
        item.setOrderId(order.getOrderId());
        item.setProductId(product.getProductId());
        item.setQuantity(2);
        item.setUnitPrice(product.getPrice());
        assertThat(items.insert(item)).isEqualTo(1);
        item.setQuantity(3);
        assertThat(items.update(item)).isEqualTo(1);
        assertThat(items.selectByOrderIdAndProductId(item).getQuantity()).isEqualTo(3);
        assertThat(items.selectByPage(pager, Map.of())).isNotEmpty();

        Review review = new Review();
        review.setTitle("Integration review");
        review.setContent("Long CLOB content. ".repeat(1000));
        review.setWriter(member.getMemberId());
        review.setProductId(product.getProductId());
        assertThat(boards.insert(review)).isEqualTo(1);
        assertThat(review.getReviewId()).isPositive();
        assertThat(boards.selectByReviewId(review.getReviewId()).getContent()).isEqualTo(review.getContent());
        assertThat(boards.selectByReviewId(review.getReviewId()).getDate()).isNotNull();
        review.setTitle("Updated review");
        assertThat(boards.update(review)).isEqualTo(1);
        assertThat(boards.selectByPage(pager, Map.of())).isNotEmpty();

        assertThat(boards.selectCount(Map.of("writer", member.getMemberId()))).isEqualTo(1);
        assertThat(boards.selectByPage(pager, Map.of("writer", member.getMemberId())))
                .extracting(Review::getReviewId).containsExactly(review.getReviewId());
        assertThat(orders.selectCount(Map.of("memberId", member.getMemberId()))).isEqualTo(1);
        assertThat(orders.selectByPage(pager, Map.of("memberId", member.getMemberId())))
                .extracting(Orders::getOrderId).containsExactly(order.getOrderId());
        assertThat(products.selectCount(Map.of("sellerId", (long) seller.getSellerId()))).isEqualTo(1);
        assertThat(products.selectByPage(pager, Map.of("sellerId", (long) seller.getSellerId())))
                .extracting(Product::getProductId).containsExactly(product.getProductId());
        assertThat(items.selectCount(Map.of("orderId", (long) order.getOrderId()))).isEqualTo(1);
        assertThat(items.selectByPage(pager, Map.of("orderId", (long) order.getOrderId())))
                .extracting(OrderItem::getProductId).containsExactly(product.getProductId());
        String sellerSearch = "seller " + member.getMemberId();
        seller.setSellerName(sellerSearch);
        sellers.update(seller);
        assertThat(sellers.selectCount(Map.of("sellerName", member.getMemberId()))).isEqualTo(1);
        assertThat(sellers.selectByPage(pager, Map.of("sellerName", member.getMemberId())))
                .extracting(Seller::getSellerId).containsExactly(seller.getSellerId());
        assertThat(boards.selectCount(Map.of())).isPositive();
        assertThat(products.selectCount(Map.of())).isPositive();
        assertThat(orders.selectCount(Map.of())).isPositive();
        assertThat(items.selectCount(Map.of())).isPositive();
        assertThat(sellers.selectCount(Map.of())).isPositive();
        String missing = "missing_" + UUID.randomUUID();
        assertThat(boards.selectCount(Map.of("writer", missing))).isZero();
        assertThat(boards.selectByPage(pager, Map.of("writer", missing))).isEmpty();
        assertThat(orders.selectCount(Map.of("memberId", missing))).isZero();
        assertThat(orders.selectByPage(pager, Map.of("memberId", missing))).isEmpty();
        assertThat(products.selectCount(Map.of("sellerId", -1L))).isZero();
        assertThat(products.selectByPage(pager, Map.of("sellerId", -1L))).isEmpty();
        assertThat(items.selectCount(Map.of("orderId", -1L))).isZero();
        assertThat(items.selectByPage(pager, Map.of("orderId", -1L))).isEmpty();
        assertThat(sellers.selectCount(Map.of("sellerName", missing))).isZero();
        assertThat(sellers.selectByPage(pager, Map.of("sellerName", missing))).isEmpty();

        assertThat(boards.deleteByReviewId(review.getReviewId())).isEqualTo(1);
        assertThat(items.deleteByOrderIdAndProductId(item)).isEqualTo(1);
        assertThat(orders.deleteByOrderId((long) order.getOrderId())).isEqualTo(1);
        assertThat(products.deleteByProductId((long) product.getProductId())).isEqualTo(1);
        assertThat(sellers.deleteBySellerId((long) seller.getSellerId())).isEqualTo(1);
        assertThat(members.deleteByMemberId(member.getMemberId())).isEqualTo(1);
    }

    @Test
    void sellerProductPagesHaveStableOrderingAndExcludeOtherSellers() {
        Seller seller = new Seller();
        seller.setSellerName("Paging test seller");
        sellers.insert(seller);
        long[] ids = new long[3];
        for (int i = 0; i < ids.length; i++) {
            Product product = new Product();
            product.setProductName("Paging product " + i);
            product.setPrice(BigDecimal.ONE);
            product.setSellerId(seller.getSellerId());
            products.insert(product);
            ids[i] = product.getProductId();
        }
        int total = products.selectCount(Map.of("sellerId", (long) seller.getSellerId()));
        assertThat(total).isEqualTo(3);
        assertThat(products.selectByPage(new Pager(2, 5, total, 1), Map.of("sellerId", (long) seller.getSellerId())))
                .extracting(Product::getProductId).containsExactly(ids[2], ids[1]);
        assertThat(products.selectByPage(new Pager(2, 5, total, 2), Map.of("sellerId", (long) seller.getSellerId())))
                .extracting(Product::getProductId).containsExactly(ids[0]);
        assertThat(products.selectByPage(new Pager(2, 5, total, 3), Map.of("sellerId", (long) seller.getSellerId())))
                .isEmpty();
        Map<String, Object> combined = Map.of("sellerId", seller.getSellerId(),
                "productId", ids[1], "productName", "product 1");
        assertThat(products.selectCount(combined)).isEqualTo(1);
        assertThat(products.selectByPage(new Pager(2, 5, 1, 1), combined))
                .extracting(Product::getProductId).containsExactly(ids[1]);
        assertThat(products.selectCount(Map.of("sellerId", seller.getSellerId(), "productName", "missing")))
                .isZero();
    }

    @Test
    void nullAndEmptyWhereReturnAllRowsAndZeroIsAnActualIdFilter() {
        Pager pager = new Pager(5, 5, 50, 1);
        assertThat(boards.selectCount(null)).isEqualTo(boards.selectCount(Map.of()));
        assertThat(products.selectCount(null)).isEqualTo(products.selectCount(Map.of()));
        assertThat(orders.selectCount(null)).isEqualTo(orders.selectCount(Map.of()));
        assertThat(items.selectCount(null)).isEqualTo(items.selectCount(Map.of()));
        assertThat(sellers.selectCount(null)).isEqualTo(sellers.selectCount(Map.of()));
        assertThat(boards.selectByPage(pager, null)).isEqualTo(boards.selectByPage(pager, Map.of()));
        assertThat(products.selectByPage(pager, null)).isEqualTo(products.selectByPage(pager, Map.of()));
        assertThat(orders.selectByPage(pager, null)).isEqualTo(orders.selectByPage(pager, Map.of()));
        assertThat(items.selectByPage(pager, null)).isEqualTo(items.selectByPage(pager, Map.of()));
        assertThat(sellers.selectByPage(pager, null)).isEqualTo(sellers.selectByPage(pager, Map.of()));
        assertThat(boards.selectCount(Map.of("writer", "", "title", "")))
                .isEqualTo(boards.selectCount(null));
        assertThat(sellers.selectCount(Map.of("sellerName", "", "email", "")))
                .isEqualTo(sellers.selectCount(null));
        assertThat(products.selectCount(Map.of("sellerId", 0))).isZero();
        assertThat(products.selectByPage(pager, Map.of("sellerId", 0))).isEmpty();
    }

    @Test
    void separateControllersSupportCrudAndFilteredLists() throws Exception {
        var seller = requestJson("create-seller", Map.of("sellerName", "Controller seller"), false);
        long sellerId = seller.get("sellerId").asInt();
        var product = requestJson("create-product", Map.of("productName", "Controller product",
                "price", 1000, "sellerId", sellerId), false);
        long productId = product.get("productId").asInt();
        var order = requestJson("create-order", Map.of("memberId", "user1"), false);
        long orderId = order.get("orderId").asInt();
        requestJson("create-order-item", Map.of("orderId", orderId, "productId", productId,
                "quantity", 1, "unitPrice", 1000), false);

        assertThat(requestJson("update-seller", Map.of("sellerId", sellerId,
                "sellerName", "Updated seller"), true).get("sellerName").asText()).isEqualTo("Updated seller");
        assertThat(requestJson("update-product", Map.of("productId", productId, "sellerId", sellerId,
                "productName", "Updated product", "price", 2000), true).get("price").asInt()).isEqualTo(2000);
        assertThat(requestJson("update-order", Map.of("orderId", orderId, "memberId", "user2"), true)
                .get("memberId").asText()).isEqualTo("user2");
        assertThat(requestJson("update-order-item", Map.of("orderId", orderId, "productId", productId,
                "quantity", 3, "unitPrice", 1000), true).get("quantity").asInt()).isEqualTo(3);

        for (var entry : Map.of("seller", Map.entry("sellerId", sellerId),
                "product", Map.entry("productId", productId), "order", Map.entry("orderId", orderId),
                "order-item", Map.entry("orderId", orderId)).entrySet()) {
            var key = entry.getValue();
            var read = get("/database/get-" + entry.getKey()).param(key.getKey(), key.getValue().toString());
            if (entry.getKey().equals("order-item")) read.param("productId", Long.toString(productId));
            mvc.perform(read).andExpect(status().isOk());
            String response = mvc.perform(get("/database/list-" + entry.getKey())
                            .param("left", key.getKey()).param("right", key.getValue().toString()))
                    .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
            assertThat(json.readTree(response).get("pager").get("totalRows").asInt()).isEqualTo(1);
            assertThat(json.readTree(response).get("list").size()).isEqualTo(1);
            mvc.perform(get("/database/list-" + entry.getKey()).param("pageNo", "0"))
                    .andExpect(status().isBadRequest());
        }
        mvc.perform(delete("/database/delete-order-item").param("orderId", "" + orderId)
                .param("productId", "" + productId)).andExpect(status().isOk());
        mvc.perform(delete("/database/delete-order").param("orderId", "" + orderId)).andExpect(status().isOk());
        mvc.perform(delete("/database/delete-product").param("productId", "" + productId)).andExpect(status().isOk());
        mvc.perform(delete("/database/delete-seller").param("sellerId", "" + sellerId)).andExpect(status().isOk());
        mvc.perform(get("/database/get-seller").param("sellerId", "" + sellerId)).andExpect(status().isNotFound());
    }

    private com.fasterxml.jackson.databind.JsonNode requestJson(String route, Object body, boolean update)
            throws Exception {
        var request = update ? put("/database/" + route) : post("/database/" + route);
        String response = mvc.perform(request.contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(body)))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        return json.readTree(response);
    }

    @Test
    void createBoardReturnsTheNewOracleIdentityForUser1() throws Exception {
        assertThat(members.selectByMemberId("user1")).isNotNull();
        long productId = jdbc.queryForObject("SELECT MIN(product_id) FROM product", Integer.class);
        String title = "Oracle API test " + UUID.randomUUID();
        String response = mvc.perform(reviewMultipart(org.springframework.http.HttpMethod.POST, "/review/create-review", Map.of("title", title, "content", "Review content", "writer", "user1", "productId", productId)))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        Review saved = boards.selectByReviewId(json.readTree(response).get("reviewId").asLong());
        assertThat(saved.getReviewId()).isPositive();
        assertThat(saved.getTitle()).isEqualTo(title);
        assertThat(saved.getWriter()).isEqualTo("user1");
        assertThat(boards.selectByReviewId(saved.getReviewId()).getTitle()).isEqualTo(title);
    }
    @Test
    void reviewApiStoresBlobAndPreservesAttachmentWhenUpdatingText() throws Exception {
        String writer = jdbc.queryForObject("SELECT member_id FROM member FETCH FIRST 1 ROW ONLY", String.class);
        Long productId = jdbc.queryForObject("SELECT product_id FROM product FETCH FIRST 1 ROW ONLY", Long.class);
        byte[] data = new byte[70000];
        new java.util.Random(42).nextBytes(data);
        Map<String, Object> request = new java.util.HashMap<>();
        request.put("title", "BLOB integration review");
        request.put("content", "Binary attachment test");
        request.put("writer", writer);
        request.put("productId", productId);
        request.put("fileName", "sample.bin");
        request.put("fileType", "application/octet-stream");
        request.put("fileData", data);
        String response = mvc.perform(reviewMultipart(org.springframework.http.HttpMethod.POST, "/review/create-review", request))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        long id = json.readTree(response).get("reviewId").asLong();

        assertThat(boards.selectByReviewId(id).getFileData()).isEqualTo(data);
        assertThat(boards.selectByReviewId(id).getFileName()).isEqualTo("sample.bin");
        Map<String, Object> search = Map.of("writer", writer, "productId", productId,
                "title", "BLOB integration", "content", "attachment test");
        assertThat(boards.selectCount(search)).isEqualTo(1);
        assertThat(boards.selectCount(Map.of("writer", writer, "productId", productId,
                "content", "nonexistent fragment 82b71"))).isZero();
        mvc.perform(post("/review/list-review").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(json.writeValueAsBytes(Map.of("writer", writer, "productId", productId.toString(), "title", "BLOB integration", "content", "attachment test"))))
                .andExpect(status().isOk())
                .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath("$.pager.totalRows").value(1))
                .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath("$.list[0].reviewId").value(id));
        mvc.perform(post("/review/list-review").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content("{}"))
                .andExpect(status().isOk());
        assertThat(jdbc.queryForObject("SELECT DBMS_LOB.GETLENGTH(file_data) FROM review WHERE review_id=?", Integer.class, id))
                .isEqualTo(data.length);
        assertThat(boards.selectByPage(new Pager(10, 5, 1, 1), Map.of("title", "BLOB integration review")))
                .allSatisfy(review -> assertThat(review.getFileData()).isNull());
        request.put("reviewId", id);
        request.remove("fileData");
        request.remove("fileName");
        request.remove("fileType");
        request.put("title", "Updated BLOB review");
        mvc.perform(reviewMultipart(org.springframework.http.HttpMethod.PUT, "/review/update-review", request))
                .andExpect(status().isOk());
        assertThat(boards.selectByReviewId(id).getFileData()).isEqualTo(data);
        request.put("fileData", new byte[]{0, 1, -1});
        request.put("fileName", "replacement.bin");
        request.put("fileType", "application/octet-stream");
        mvc.perform(reviewMultipart(org.springframework.http.HttpMethod.PUT, "/review/update-review", request))
                .andExpect(status().isOk());
        assertThat(boards.selectByReviewId(id).getFileData()).isEqualTo(new byte[]{0, 1, -1});
        assertThat(boards.selectByReviewId(id).getFileName()).isEqualTo("replacement.bin");
        request.remove("fileData");
        mvc.perform(reviewMultipart(org.springframework.http.HttpMethod.PUT, "/review/update-review", request)
                .param("fileName", "Delete").param("fileType", "application/octet-stream"))
                .andExpect(status().isOk());
        assertThat(boards.selectByReviewId(id).getFileName()).isEqualTo("replacement.bin");
        mvc.perform(reviewMultipart(org.springframework.http.HttpMethod.PUT, "/review/update-review", request)
                .param("fileName", "Delete"))
                .andExpect(status().isOk());
        Review withoutFile = boards.selectByReviewId(id);
        assertThat(withoutFile.getFileName()).isNull();
        assertThat(withoutFile.getFileType()).isNull();
        assertThat(withoutFile.getFileData()).isNull();
        mvc.perform(get("/review/get-review").param("reviewId", String.valueOf(id)).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }    private org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder reviewMultipart(
            org.springframework.http.HttpMethod method, String path, Map<String, Object> fields) {
        var builder = org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart(method, path);
        fields.forEach((key, value) -> {
            if (!key.equals("fileData") && !key.equals("fileName") && !key.equals("fileType")) {
                builder.param(key, value.toString());
            }
        });
        if (fields.get("fileData") instanceof byte[] bytes) {
            builder.file(new org.springframework.mock.web.MockMultipartFile("file",
                    (String) fields.get("fileName"), (String) fields.get("fileType"), bytes));
        }
        builder.accept(MediaType.APPLICATION_JSON);
        return builder;
    }}

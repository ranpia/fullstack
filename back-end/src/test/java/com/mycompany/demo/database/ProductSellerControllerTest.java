package com.mycompany.demo.database;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.mycompany.demo.database.controller.ProductController;
import com.mycompany.demo.database.controller.SellerController;
import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Product;
import com.mycompany.demo.database.entity.Seller;
import com.mycompany.demo.database.service.ProductService;
import com.mycompany.demo.database.service.SellerService;

class ProductSellerControllerTest {
    @Test
    void productMapsRequestsAndEntityResultsAndChecksErrors() throws Exception {
        ProductService service = mock(ProductService.class);
        Product product = new Product(42, "상품", BigDecimal.TEN, 7);
        when(service.createProduct(any())).thenReturn(product);
        when(service.getProductPager(any())).thenReturn(new Pager(10, 5, 1, 1));
        when(service.listProduct(any(), any())).thenReturn(List.of(product));
        var mvc = MockMvcBuilders.standaloneSetup(new ProductController(service))
                .defaultRequest(get("/").accept(MediaType.APPLICATION_JSON)).build();

        mvc.perform(post("/database/create-product").contentType(MediaType.APPLICATION_JSON)
                .content("{\"productName\":\"상품\",\"price\":10,\"sellerId\":7}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.productId").value(42));
        verify(service).createProduct(argThat(value -> value.getProductId() == 0
                && value.getSellerId() == 7 && BigDecimal.TEN.equals(value.getPrice())));
        mvc.perform(get("/database/list-product").param("left", "sellerId").param("right", "7"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.pager.totalRows").value(1))
                .andExpect(jsonPath("$.list[0].productId").value(42));
        verify(service).getProductPager(argThat(criteria -> criteria.getLeft().equals("sellerId")
                && criteria.getRight().equals("7") && criteria.getPageNo() == 1));
        mvc.perform(get("/database/list-product").param("pageNo", "0")).andExpect(status().isBadRequest());
        mvc.perform(get("/database/get-product").param("productId", "999")).andExpect(status().isNotFound());
        mvc.perform(delete("/database/delete-product").param("productId", "999")).andExpect(status().isNotFound());
        verify(service, times(1)).getProductPager(any());
    }

    @Test
    void sellerMapsRequestsAndStoredRegistrationDateAndChecksErrors() throws Exception {
        SellerService service = mock(SellerService.class);
        Seller seller = new Seller(7, "판매자", "test@example.com", "010", Date.valueOf("2026-10-28"));
        when(service.createSeller(any())).thenReturn(seller);
        when(service.getSellerPager(any())).thenReturn(new Pager(10, 5, 1, 1));
        when(service.listSeller(any(), any())).thenReturn(List.of(seller));
        var mvc = MockMvcBuilders.standaloneSetup(new SellerController(service))
                .defaultRequest(get("/").accept(MediaType.APPLICATION_JSON)).build();

        mvc.perform(post("/database/create-seller").contentType(MediaType.APPLICATION_JSON)
                .content("{\"sellerName\":\"판매자\",\"email\":\"test@example.com\",\"phone\":\"010\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.sellerId").value(7))
                .andExpect(jsonPath("$.registeredAt").value(seller.getRegisteredAt().getTime()));
        verify(service).createSeller(argThat(value -> value.getSellerId() == 0
                && value.getSellerName().equals("판매자") && value.getRegisteredAt() == null));
        mvc.perform(get("/database/list-seller")).andExpect(status().isOk())
                .andExpect(jsonPath("$.list[0].sellerId").value(7));
        mvc.perform(get("/database/list-seller").param("pageNo", "0")).andExpect(status().isBadRequest());
        mvc.perform(get("/database/get-seller").param("sellerId", "999")).andExpect(status().isNotFound());
        mvc.perform(delete("/database/delete-seller").param("sellerId", "999")).andExpect(status().isNotFound());
        verify(service, times(1)).getSellerPager(any());
    }
}

package com.mycompany.demo.database.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.mycompany.demo.database.dto.product.*;
import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Product;
import com.mycompany.demo.database.service.ProductService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/database")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/get-product")
    public ProductResponse getProduct(@RequestParam("productId") Long productId) {
        Product product = productService.getProduct(productId);
        if (product == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        return ProductResponse.builder()
                .productId(product.getProductId())
                .productName(product.getProductName())
                .price(product.getPrice())
                .sellerId(product.getSellerId())
                .build();
    }

    @PostMapping("/create-product")
    public ProductResponse createProduct(@RequestBody CreateProductRequest request) {
        Product product = new Product();
        product.setProductName(request.getProductName());
        product.setPrice(request.getPrice());
        product.setSellerId(request.getSellerId());
        Product created = productService.createProduct(product);
        if (created == null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Product creation failed");
        }
        return ProductResponse.builder()
                .productId(created.getProductId())
                .productName(created.getProductName())
                .price(created.getPrice())
                .sellerId(created.getSellerId())
                .build();
    }

    @PutMapping("/update-product")
    public ProductResponse updateProduct(@RequestBody UpdateProductRequest request) {
        Product product = new Product();
        product.setProductId(request.getProductId());
        product.setProductName(request.getProductName());
        product.setPrice(request.getPrice());
        product.setSellerId(request.getSellerId());
        if (productService.updateProduct(product) == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        Product updated = productService.getProduct((long) product.getProductId());
        if (updated == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        return ProductResponse.builder()
                .productId(updated.getProductId())
                .productName(updated.getProductName())
                .price(updated.getPrice())
                .sellerId(updated.getSellerId())
                .build();
    }

    @DeleteMapping("/delete-product")
    public DeleteProductResponse deleteProduct(@RequestParam("productId") Long productId) {
        int rows = productService.deleteProduct(productId);
        if (rows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        return DeleteProductResponse.builder().deletedRows(rows).build();
    }

    @GetMapping("/list-product")
    public ListProductResponse listProduct(@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(value = "left", defaultValue = "") String left,
            @RequestParam(value = "right", defaultValue = "") String right) {
        if (pageNo < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "pageNo must be positive");
        }
        ProductSearchCriteria criteria = new ProductSearchCriteria();
        criteria.setPageNo(pageNo);
        criteria.setLeft(left);
        criteria.setRight(right);
        Pager pager = productService.getProductPager(criteria);
        return ListProductResponse.builder()
                .pager(pager)
                .list(productService.listProduct(criteria, pager).stream()
                        .map(value -> ProductResponse.builder()
                                .productId(value.getProductId())
                                .productName(value.getProductName())
                                .price(value.getPrice())
                                .sellerId(value.getSellerId())
                                .build())
                        .toList())
                .build();
    }
}

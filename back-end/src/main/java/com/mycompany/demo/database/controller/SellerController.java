package com.mycompany.demo.database.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.mycompany.demo.database.dto.seller.*;
import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Seller;
import com.mycompany.demo.database.service.SellerService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/database")
@RequiredArgsConstructor
public class SellerController {
    private final SellerService sellerService;

    @GetMapping("/get-seller")
    public SellerResponse getSeller(@RequestParam("sellerId") Long sellerId) {
        Seller seller = sellerService.getSeller(sellerId);
        if (seller == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found");
        }
        return SellerResponse.builder()
                .sellerId(seller.getSellerId())
                .sellerName(seller.getSellerName())
                .email(seller.getEmail())
                .phone(seller.getPhone())
                .registeredAt(seller.getRegisteredAt())
                .build();
    }

    @PostMapping("/create-seller")
    public SellerResponse createSeller(@RequestBody CreateSellerRequest request) {
        Seller seller = new Seller();
        seller.setSellerName(request.getSellerName());
        seller.setEmail(request.getEmail());
        seller.setPhone(request.getPhone());
        seller.setRegisteredAt(request.getRegisteredAt());
        Seller created = sellerService.createSeller(seller);
        if (created == null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Seller creation failed");
        }
        return SellerResponse.builder()
                .sellerId(created.getSellerId())
                .sellerName(created.getSellerName())
                .email(created.getEmail())
                .phone(created.getPhone())
                .registeredAt(created.getRegisteredAt())
                .build();
    }

    @PutMapping("/update-seller")
    public SellerResponse updateSeller(@RequestBody UpdateSellerRequest request) {
        Seller seller = new Seller();
        seller.setSellerId(request.getSellerId());
        seller.setSellerName(request.getSellerName());
        seller.setEmail(request.getEmail());
        seller.setPhone(request.getPhone());
        if (sellerService.updateSeller(seller) == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found");
        }
        Seller updated = sellerService.getSeller((long) seller.getSellerId());
        if (updated == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found");
        }
        return SellerResponse.builder()
                .sellerId(updated.getSellerId())
                .sellerName(updated.getSellerName())
                .email(updated.getEmail())
                .phone(updated.getPhone())
                .registeredAt(updated.getRegisteredAt())
                .build();
    }

    @DeleteMapping("/delete-seller")
    public DeleteSellerResponse deleteSeller(@RequestParam("sellerId") Long sellerId) {
        int rows = sellerService.deleteSeller(sellerId);
        if (rows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found");
        }
        return DeleteSellerResponse.builder().deletedRows(rows).build();
    }

    @GetMapping("/list-seller")
    public ListSellerResponse listSeller(@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(value = "left", defaultValue = "") String left,
            @RequestParam(value = "right", defaultValue = "") String right) {
        if (pageNo < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "pageNo must be positive");
        }
        SellerSearchCriteria criteria = new SellerSearchCriteria();
        criteria.setPageNo(pageNo);
        criteria.setLeft(left);
        criteria.setRight(right);
        Pager pager = sellerService.getSellerPager(criteria);
        return ListSellerResponse.builder()
                .pager(pager)
                .list(sellerService.listSeller(criteria, pager).stream()
                        .map(value -> SellerResponse.builder()
                                .sellerId(value.getSellerId())
                                .sellerName(value.getSellerName())
                                .email(value.getEmail())
                                .phone(value.getPhone())
                                .registeredAt(value.getRegisteredAt())
                                .build())
                        .toList())
                .build();
    }
}

package com.mycompany.demo.database.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.mycompany.demo.database.dao.SellerDao;
import com.mycompany.demo.database.entity.Seller;
import com.mycompany.demo.database.dto.seller.SellerSearchCriteria;
import com.mycompany.demo.database.dto.common.Pager;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerService {
    private final SellerDao sellerDao;

    public Seller getSeller(Long sellerId) {
        return sellerDao.selectBySellerId(sellerId);
    }

    @Transactional
    public Seller createSeller(Seller seller) {
        if (sellerDao.insert(seller) != 1) {
            return null;
        }
        return getSeller((long) seller.getSellerId());
    }

    @Transactional
    public int updateSeller(Seller request) {
        Seller seller = getSeller((long) request.getSellerId());
        if (seller == null) {
            return 0;
        }
        seller.setSellerName(request.getSellerName());
        seller.setEmail(request.getEmail());
        seller.setPhone(request.getPhone());
        return sellerDao.update(seller);
    }

    public int deleteSeller(Long sellerId) {
        return sellerDao.deleteBySellerId(sellerId);
    }

    public Pager getSellerPager(SellerSearchCriteria criteria) {
        int totalRows = sellerDao.selectCount(filter(criteria));
        return new Pager(10, 5, totalRows, criteria.getPageNo());
    }

    public List<Seller> listSeller(SellerSearchCriteria criteria, Pager pager) {
        return sellerDao.selectByPage(pager, filter(criteria));
    }

    private Map<String, Object> filter(SellerSearchCriteria criteria) {
        return criteria.getLeft().isBlank() || criteria.getRight().isBlank()
                ? Map.of() : Map.of(criteria.getLeft(), criteria.getRight());
    }
}

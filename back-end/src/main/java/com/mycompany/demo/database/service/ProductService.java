package com.mycompany.demo.database.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.mycompany.demo.database.dao.ProductDao;
import com.mycompany.demo.database.entity.Product;
import com.mycompany.demo.database.dto.product.ProductSearchCriteria;
import com.mycompany.demo.database.dto.common.Pager;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductDao productDao;

    public Product getProduct(Long productId) {
        return productDao.selectByProductId(productId);
    }

    @Transactional
    public Product createProduct(Product product) {
        if (productDao.insert(product) != 1) {
            return null;
        }
        return getProduct((long) product.getProductId());
    }

    @Transactional
    public int updateProduct(Product request) {
        Product product = getProduct((long) request.getProductId());
        if (product == null) {
            return 0;
        }
        product.setProductName(request.getProductName());
        product.setPrice(request.getPrice());
        product.setSellerId(request.getSellerId());
        return productDao.update(product);
    }

    public int deleteProduct(Long productId) {
        return productDao.deleteByProductId(productId);
    }

    public Pager getProductPager(ProductSearchCriteria criteria) {
        int totalRows = productDao.selectCount(filter(criteria));
        return new Pager(10, 5, totalRows, criteria.getPageNo());
    }

    public List<Product> listProduct(ProductSearchCriteria criteria, Pager pager) {
        return productDao.selectByPage(pager, filter(criteria));
    }

    private Map<String, Object> filter(ProductSearchCriteria criteria) {
        return criteria.getLeft().isBlank() || criteria.getRight().isBlank()
                ? Map.of() : Map.of(criteria.getLeft(), criteria.getRight());
    }
}

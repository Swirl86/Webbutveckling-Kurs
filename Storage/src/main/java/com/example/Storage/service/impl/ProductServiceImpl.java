package com.example.Storage.service.impl;

import com.example.Storage.exception.BadRequestException;
import com.example.Storage.repository.ProductRepository;
import com.example.Storage.repository.entity.ProductEntity;
import com.example.Storage.service.ProductService;
import com.example.Storage.shared.Util;
import com.example.Storage.shared.dto.ProductDto;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private Util util;

    public ProductServiceImpl(ProductRepository productRepository, Util util) {
        this.productRepository = productRepository;
        this.util = util;
    }

    @Override
    public List<ProductDto> getProducts() {
        Iterable<ProductEntity> productEntityList = productRepository.findAll();
        List<ProductDto> productDtoList = new ArrayList<>();

        for (ProductEntity product : productEntityList) {
            ProductDto productDto = new ProductDto();
            BeanUtils.copyProperties(product, productDto);
            productDtoList.add(productDto);
        }

        return productDtoList;
    }

    @Override
    public Optional<ProductDto> getProductById(String productId) {
        Optional<ProductEntity> productEntity = productRepository.findByProductId(productId);

        return productEntity.map(product -> {
            ProductDto response = new ProductDto();
            BeanUtils.copyProperties(product, response);
            return response;
        });
    }

    @Override
    public ProductDto createProduct(ProductDto productDetails) {

        if (notValid(productDetails)) {
            throw new BadRequestException("Invalid input! Hint: " +
                    "Cost must be higher then 0 and name/category must be given.");
        }

        ProductEntity product = new ProductEntity();
        BeanUtils.copyProperties(productDetails, product);

        // id will always be unique so generated productId will be unique
        String productId = util.generateHash(String.valueOf(productDetails.getId()));
        product.setProductId(productId.substring(3));

        ProductEntity newProduct = productRepository.save(product);
        ProductDto response = new ProductDto();
        BeanUtils.copyProperties(newProduct, response);

        return response;
    }

    private boolean notValid(ProductDto productDetails) {
        return productDetails.getCost() < 1 || productDetails.getName().isEmpty()
                || productDetails.getCategory().isEmpty();
    }

    @Override
    public Optional<ProductDto> updateProduct(String productId, ProductDto productDto) {
        Optional<ProductEntity> productEntity = productRepository.findByProductId(productId);

        if (productEntity.isEmpty()) {
            return Optional.empty();
        }

        return productEntity.map(product -> {
            ProductDto response = new ProductDto();
            // Set all new non-null properties
            product.setName(productDto.getName() == null ? product.getName() : productDto.getName());
            product.setCategory(productDto.getCategory() == null ? product.getCategory() : productDto.getCategory());
            product.setCost(productDto.getCost() < 1 ? product.getCost() : productDto.getCost());

            ProductEntity updatedProduct = productRepository.save(product);
            BeanUtils.copyProperties(updatedProduct, response);
            return response;
        });
    }

    @Override
    @Transactional
    public boolean deleteProduct(String productId) {
        Long removedProductsCount = productRepository.deleteByProductId(productId);
        return removedProductsCount > 0;
    }

    @Override
    @Transactional
    public boolean deleteAllProducts() {
        productRepository.deleteAll();
        long existingProductsCount = productRepository.count();
        return existingProductsCount == 0;
    }
}

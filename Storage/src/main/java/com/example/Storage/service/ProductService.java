package com.example.Storage.service;

import com.example.Storage.shared.dto.ProductDto;

import java.util.List;
import java.util.Optional;


public interface ProductService {

    List<ProductDto> getProducts();

    Optional<ProductDto> getProductById(String productId);

    ProductDto createProduct(ProductDto productDetails);

    Optional<ProductDto> updateProduct(String productId, ProductDto productDetails);

    boolean deleteProduct(String productId);

    boolean deleteAllProducts();
}

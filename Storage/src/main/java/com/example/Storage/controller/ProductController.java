package com.example.Storage.controller;

import com.example.Storage.exception.NotFoundException;
import com.example.Storage.model.request.ProductDetailRequestModel;
import com.example.Storage.model.response.ProductResponseModel;
import com.example.Storage.service.ProductService;
import com.example.Storage.shared.dto.ProductDto;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("products")  // http://localhost:8080/products
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductResponseModel> getAllProducts() {
        List<ProductDto> productDtoList = productService.getProducts();
        ArrayList<ProductResponseModel> responseModelList = new ArrayList<>();

        for (ProductDto product : productDtoList) {
            ProductResponseModel responseModel = new ProductResponseModel();
            BeanUtils.copyProperties(product, responseModel);
            responseModelList.add(responseModel);
        }

        return responseModelList;
    }

    @GetMapping("/{productId}")
    public ProductResponseModel getProduct(@PathVariable String productId) {
        Optional<ProductDto> product = productService.getProductById(productId);

        if (product.isPresent()) {
            ProductResponseModel response = new ProductResponseModel();
            ProductDto productDto = product.get();
            BeanUtils.copyProperties(productDto, response);
            return response;
        }
        throw new NotFoundException("Product id " + productId + " does not exist.");
    }

    // Create a product { name: ”Shampoo”, cost: 20, category: ”Hair” }
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public ProductResponseModel createProduct(@RequestBody ProductDetailRequestModel productDetails) {

        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(productDetails, productDto);

        ProductDto newProduct = productService.createProduct(productDto);

        ProductResponseModel response = new ProductResponseModel();
        BeanUtils.copyProperties(newProduct, response);

        return response;
    }

    @PutMapping("/{productId}")
    public ProductResponseModel updateProduct(@PathVariable String productId,
                                              @RequestBody ProductDetailRequestModel productDetails) {

        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(productDetails, productDto);
        Optional<ProductDto> optionalProductDto = productService.updateProduct(productId, productDto);

        if (optionalProductDto.isEmpty()) {
            throw new NotFoundException("Product id " + productId + " does not exist.");
        }

        ProductResponseModel response = new ProductResponseModel();
        ProductDto updatedProduct = optionalProductDto.get();
        BeanUtils.copyProperties(updatedProduct, response);

        return response;
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable String productId) {
        boolean deleted = productService.deleteProduct(productId);
        if (deleted) {
            return "[]";
        }
        throw new NotFoundException("Product id " + productId + " does not exist.");
    }

    @DeleteMapping("/rm")
    public String deleteAllProducts() {
        boolean allDeleted = productService.deleteAllProducts();
        if (allDeleted) {
            return "[]";
        }
        //throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        throw new NotFoundException("Something went wrong!");
    }

}

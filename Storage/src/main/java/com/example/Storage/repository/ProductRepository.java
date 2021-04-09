package com.example.Storage.repository;

import com.example.Storage.repository.entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends CrudRepository<ProductEntity, Long> {

    Optional<ProductEntity> findByProductId(String productId);

    Long deleteByProductId(String productId);
}

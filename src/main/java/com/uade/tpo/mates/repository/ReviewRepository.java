package com.uade.tpo.mates.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uade.tpo.mates.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);

    List<Review> findByUserIdOrderByCreatedAtDesc(Long userId);

    boolean existsByUserIdAndProductId(Long userId, Long productId);
}

package com.uade.tpo.mates.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.uade.tpo.mates.entity.OrderDetail;
import com.uade.tpo.mates.entity.OrderStatus;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    boolean existsByProductId(Long productId);

    @Query("select count(d) from OrderDetail d "
            + "where d.order.user.id = :userId and d.product.id = :productId and d.order.status in :statuses")
    long countPurchases(@Param("userId") Long userId, @Param("productId") Long productId,
            @Param("statuses") Collection<OrderStatus> statuses);

    default boolean hasPurchased(Long userId, Long productId, Collection<OrderStatus> statuses) {
        return countPurchases(userId, productId, statuses) > 0;
    }
}

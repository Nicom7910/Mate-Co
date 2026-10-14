package com.uade.tpo.mates.service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tpo.mates.controllers.stats.StatsResponse;
import com.uade.tpo.mates.controllers.stats.TopProductResponse;
import com.uade.tpo.mates.entity.Order;
import com.uade.tpo.mates.entity.OrderDetail;
import com.uade.tpo.mates.entity.OrderStatus;
import com.uade.tpo.mates.repository.OrderRepository;

@Service
public class StatsServiceImpl implements StatsService {

    private static final Set<OrderStatus> SOLD_STATUSES = EnumSet.of(
            OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED);

    private static final int TOP_PRODUCTS = 5;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional(readOnly = true)
    public StatsResponse getStats() {
        List<Order> orders = orderRepository.findAll();
        List<Order> sales = orders.stream()
                .filter(order -> SOLD_STATUSES.contains(order.getStatus()))
                .toList();
        List<Order> returns = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.CANCELLED)
                .toList();

        return StatsResponse.builder()
                .salesCount(sales.size())
                .salesAmount(sumTotals(sales))
                .returnsCount(returns.size())
                .returnsAmount(sumTotals(returns))
                .topProducts(topProducts(sales))
                .build();
    }

    private BigDecimal sumTotals(List<Order> orders) {
        return orders.stream()
                .map(Order::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private List<TopProductResponse> topProducts(List<Order> sales) {
        Map<Long, List<OrderDetail>> detailsByProduct = sales.stream()
                .flatMap(order -> order.getItems().stream())
                .collect(Collectors.groupingBy(detail -> detail.getProduct().getId()));

        return detailsByProduct.entrySet().stream()
                .map(entry -> toTopProduct(entry.getKey(), entry.getValue()))
                .sorted(Comparator.comparingLong(TopProductResponse::getUnitsSold).reversed()
                        .thenComparing(TopProductResponse::getProductName))
                .limit(TOP_PRODUCTS)
                .toList();
    }

    private TopProductResponse toTopProduct(Long productId, List<OrderDetail> details) {
        return TopProductResponse.builder()
                .productId(productId)
                .productName(details.get(0).getProduct().getName())
                .unitsSold(details.stream().mapToLong(OrderDetail::getQuantity).sum())
                .revenue(details.stream().map(OrderDetail::getSubtotal).reduce(BigDecimal.ZERO, BigDecimal::add))
                .build();
    }
}
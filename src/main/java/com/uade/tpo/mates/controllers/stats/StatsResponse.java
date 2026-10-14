package com.uade.tpo.mates.controllers.stats;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatsResponse {
    private long salesCount;
    private BigDecimal salesAmount;
    private long returnsCount;
    private BigDecimal returnsAmount;
    private List<TopProductResponse> topProducts;
}
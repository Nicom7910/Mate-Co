package com.uade.tpo.mates.controllers.reviews;

import lombok.Data;

@Data
public class ReviewRequest {
    private Integer rating;
    private String comment;
}

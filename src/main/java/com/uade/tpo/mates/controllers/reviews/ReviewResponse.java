package com.uade.tpo.mates.controllers.reviews;

import java.time.LocalDateTime;

import com.uade.tpo.mates.entity.Review;
import com.uade.tpo.mates.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private Long id;
    private Long productId;
    private String userName;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public static ReviewResponse from(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .productId(review.getProduct().getId())
                .userName(displayName(review.getUser()))
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }

    private static String displayName(User user) {
        String lastName = user.getLastName();
        if (lastName == null || lastName.isBlank())
            return user.getName();
        return user.getName() + " " + lastName.trim().charAt(0) + ".";
    }
}

package com.uade.tpo.mates.controllers.reviews;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.mates.entity.Review;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.exceptions.ReviewAlreadyExistsException;
import com.uade.tpo.mates.exceptions.ReviewNotAllowedException;
import com.uade.tpo.mates.service.ReviewService;

@RestController
public class ReviewsController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<List<ReviewResponse>> getProductReviews(@PathVariable Long productId)
            throws ProductNotFoundException {
        List<ReviewResponse> reviews = reviewService.getProductReviews(productId).stream()
                .map(ReviewResponse::from)
                .toList();
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<ReviewResponse> createReview(@AuthenticationPrincipal User user,
            @PathVariable Long productId, @RequestBody ReviewRequest request)
            throws ProductNotFoundException, ReviewNotAllowedException, ReviewAlreadyExistsException {
        Review review = reviewService.createReview(user, productId, request);
        return ResponseEntity.created(URI.create("/products/" + productId + "/reviews"))
                .body(ReviewResponse.from(review));
    }

    @GetMapping("/reviews/me")
    public ResponseEntity<List<ReviewResponse>> getMyReviews(@AuthenticationPrincipal User user) {
        List<ReviewResponse> reviews = reviewService.getUserReviews(user.getId()).stream()
                .map(ReviewResponse::from)
                .toList();
        return ResponseEntity.ok(reviews);
    }
}

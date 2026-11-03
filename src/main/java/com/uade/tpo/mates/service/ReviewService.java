package com.uade.tpo.mates.service;

import java.util.List;

import com.uade.tpo.mates.controllers.reviews.ReviewRequest;
import com.uade.tpo.mates.entity.Review;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.exceptions.ReviewAlreadyExistsException;
import com.uade.tpo.mates.exceptions.ReviewNotAllowedException;

public interface ReviewService {

    List<Review> getProductReviews(Long productId) throws ProductNotFoundException;

    List<Review> getUserReviews(Long userId);

    Review createReview(User user, Long productId, ReviewRequest request)
            throws ProductNotFoundException, ReviewNotAllowedException, ReviewAlreadyExistsException;
}

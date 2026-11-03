package com.uade.tpo.mates.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.uade.tpo.mates.controllers.reviews.ReviewRequest;
import com.uade.tpo.mates.entity.OrderStatus;
import com.uade.tpo.mates.entity.Product;
import com.uade.tpo.mates.entity.Review;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.FieldErrors;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.exceptions.ReviewAlreadyExistsException;
import com.uade.tpo.mates.exceptions.ReviewNotAllowedException;
import com.uade.tpo.mates.repository.OrderDetailRepository;
import com.uade.tpo.mates.repository.ProductRepository;
import com.uade.tpo.mates.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService {

    private static final int MIN_RATING = 1;

    private static final int MAX_RATING = 5;

    private static final int MAX_COMMENT_LENGTH = 1000;

    private static final List<OrderStatus> REVIEWABLE_STATUSES = List.of(OrderStatus.DELIVERED);

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public List<Review> getProductReviews(Long productId) throws ProductNotFoundException {
        if (!productRepository.existsById(productId))
            throw new ProductNotFoundException();
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }

    public List<Review> getUserReviews(Long userId) {
        return reviewRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional(rollbackFor = Exception.class)
    public Review createReview(User user, Long productId, ReviewRequest request)
            throws ProductNotFoundException, ReviewNotAllowedException, ReviewAlreadyExistsException {
        Integer rating = request.getRating();
        String comment = StringUtils.hasText(request.getComment()) ? request.getComment().trim() : null;

        new FieldErrors()
                .require(rating != null && rating >= MIN_RATING && rating <= MAX_RATING, "rating",
                        "Elegí una puntuación de 1 a 5 estrellas.")
                .require(comment == null || comment.length() <= MAX_COMMENT_LENGTH, "comment",
                        "El comentario puede tener hasta " + MAX_COMMENT_LENGTH + " caracteres.")
                .throwIfAny();

        Product product = productRepository.findById(productId)
                .orElseThrow(ProductNotFoundException::new);

        if (reviewRepository.existsByUserIdAndProductId(user.getId(), productId))
            throw new ReviewAlreadyExistsException();

        if (!orderDetailRepository.hasPurchased(user.getId(), productId, REVIEWABLE_STATUSES))
            throw new ReviewNotAllowedException();

        return reviewRepository.save(Review.builder()
                .product(product)
                .user(user)
                .rating(rating)
                .comment(comment)
                .build());
    }
}

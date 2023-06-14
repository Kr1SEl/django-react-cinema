import React, { useState, useEffect } from "react";
import { getReviewsByMovieId, postReview } from "../actions/api";
import { TextField, Button, Grid, Typography, Box } from '@mui/material';

const Review = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({});

    useEffect(() => {
        const fetchReviews = async () => {
            const reviews = await getReviewsByMovieId(movieId);
            setReviews(reviews);
        };

        fetchReviews();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await postReview(movieId, newReview);
        setNewReview({});
    };

    return (
        <Box>
            <p>
                Comments and Ratings
            </p>
            {reviews.map((review, index) => (
                <Box key={index}>
                    <p>User: {review.user_id}</p>
                    <p>Review: {review.review}</p>
                    <p>Grade: {review.grade}</p>
                </Box>
            ))}
            <p>
                Add a Review
            </p>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="User"
                            value={newReview.user_id || ''}
                            onChange={e => setNewReview({ ...newReview, user_id: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Review"
                            value={newReview.review || ''}
                            onChange={e => setNewReview({ ...newReview, review: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Grade"
                            value={newReview.grade || ''}
                            onChange={e => setNewReview({ ...newReview, grade: parseInt(e.target.value) })}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Submit Review</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Review;

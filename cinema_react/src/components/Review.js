import React, { useState, useEffect } from "react";
import { getReviews, postReview } from "../actions/api";
import {
    TextField, Button, Grid, Box, Card, CardContent, Select, MenuItem, InputLabel
} from '@mui/material';

const Review = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({});

    useEffect(async () => {
        const reviews = await getReviews(movieId);
        setReviews(reviews);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);
        await postReview(movieId, newReview);
        setNewReview({});
        window.location.reload(false);
    };

    return (
        <>
            <h2>
                Comments and Ratings
            </h2>
            {reviews.map((review, index) => (
                <Card>
                    <CardContent>
                        <Box key={index}>
                            <h3>{review.user_id}:</h3>
                            <h3>{'⭐'.repeat(review.grade)}</h3>
                            <h3>{review.review}</h3>
                        </Box>
                    </CardContent>
                </Card>
            ))}
            <h2>
                Add a Review
            </h2>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Review"
                                    value={newReview.review || ''}
                                    onChange={e => setNewReview({ ...newReview, review: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="grade-label">
                                    Grade
                                </InputLabel>
                                <Select
                                    label="Grade"
                                    labelId="grade-label"
                                    value={newReview.grade || '5'}
                                    onChange={e => setNewReview({ ...newReview, grade: parseInt(e.target.value) })}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">Submit Review</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default Review;

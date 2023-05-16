import React from 'react';
import AdditionalNavbar from '../../components/AdditionalNavbar';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 180,
    },
}));

const CinemaPromos = () => {
    const classes = useStyles();

    const img1 = require('../../assets/img1.jpg').default;
    const img2 = require('../../assets/img2.jpg').default;
    const img3 = require('../../assets/img3.jpg').default;
    const img4 = require('../../assets/img4.jpg').default;
    const img5 = require('../../assets/img5.jpg').default;
    const img6 = require('../../assets/img6.jpg').default;

    const promos = [
        {
            name: 'Cheaper With Friends',
            description: 'Buy four or more tickets in a single transaction and get 20% off each ticket. Perfect for group outings, celebrations, or just a casual get-together with your buddies. Gather your crew and take advantage of this amazing deal!',
            image: img1
        },
        {
            name: 'Family Fun Bundle',
            description: 'Bring the whole family to the movies and save! Our Family Fun Bundle includes four movie tickets, two large popcorns, and four medium drinks for a discounted price.',
            image: img2
        },
        {
            name: 'Date Night Special',
            description: 'Treat your special someone to a night at the movies with our Date Night Special. Purchase two movie tickets, a large popcorn, and two medium drinks at a discounted rate.',
            image: img3
        },
        {
            name: 'Student Sundays',
            description: 'Students can unwind on Sundays with our exclusive Student Sunday offer. Present your student ID to receive 30% off movie tickets and a free small popcorn.',
            image: img4
        },
        {
            name: 'Loyalty Rewards Program',
            description: 'Join our Loyalty Rewards Program and earn points with every movie ticket and concession purchase. Redeem your points for free movie tickets, snacks, and exclusive merchandise.',
            image: img5
        },
        {
            name: 'Weekday Discounts',
            description: 'Enjoy our special weekday discounts! Get 15% off on movie tickets from Monday to Thursday. Catch the latest releases at a fraction of the cost.',
            image: img6
        },

        // More promos...
    ];

    return (
        <div>
            <AdditionalNavbar />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {promos.map((promo, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card style={{ height: "310px" }}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={promo.image}
                                        title={promo.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {promo.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {promo.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default CinemaPromos;

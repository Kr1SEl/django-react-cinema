import React from 'react';
import Map from './Map';
import { makeStyles } from '@mui/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    IconButton,
    Button,
    Box,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AdditionalNavbar from '../../components/AdditionalNavbar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '50px',
        background: 'linear-gradient(to top, #343434, #000000 15%, #000000 100%)',
        height: '66vh',
    },
    title: {
        flexGrow: 1,
    },
    carousel: {
        width: '100%',
        height: '500px',
        position: 'relative',
        '& .carousel-slider': {
            display: 'flex',
            alignItems: 'center',
        },
    },
    carouselImgContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    carouselImg: {
        maxHeight: '500px',
        maxWidth: '100%',
        objectFit: 'contain',
    },
}));

const img1 = require('../../assets/cinema_hall.jpg').default;
const img2 = require('../../assets/relux.jpg').default;
const img3 = require('../../assets/vip_cinema_hall.jpg').default;
const img4 = require('../../assets/4dx.png').default;

const images = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
];

function TestPage() {
    const classes = useStyles();
    const location = [51.089666308, 17.017166598];

    return (
        <div>
            <AdditionalNavbar />
            <Typography className='neonText'>
                <b>Welcome to the cinema</b>
            </Typography>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Carousel
                            className={classes.carousel}
                            showThumbs={false}
                            showStatus={false}
                            showIndicators={false}
                            infiniteLoop
                            autoPlay
                            interval={3000}
                        >
                            {images.slice(0, 4).map((image, index) => (
                                <Box key={index} className={classes.carouselImgContainer}>
                                    <img className={classes.carouselImg} src={image.img} />
                                </Box>
                            ))}
                        </Carousel>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Map location={location} />
                    </Grid>
                </Grid>
            </div>
        </div >
    );
};

export default TestPage;
import React from 'react';
import Map from './Map';
import { makeStyles } from '@mui/styles';
import '../../../static/frontend/index.css';
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
import AdditionalNavbar from '../../components/AdditionalNavbar';


function TestPage() {
    return (
        <Box height="100vh" bgcolor="#f0f0f0" style={{ background: 'linear-gradient(to top right, #f0f0f0 50%, #ffffff 50%)' }}>
            <h1>My Component</h1>
            <p>Some text here</p>
        </Box>
    );
};

export default TestPage;
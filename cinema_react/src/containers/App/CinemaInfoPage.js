import React from "react";
import { AppBar, Toolbar, Typography, Button, SvgIcon, Drawer, Box } from '@mui/material';
import '../../../static/frontend/index.css';

const Info = () => {
    return (
        <Box height="100vh" width="25vw" bgcolor="#f0f0f0" style={{ background: 'linear-gradient(to top left, #000000 50%, #171717 50%)', color: '#ffffff' }}>
            <div style={{ padding: '20px' }}>
                <h1>About Cinema</h1>
                <hr></hr>
                <p style={{ fontSize: '18px', fontFamily: 'rajdhani' }}><b>Wroclaw Cinema</b> is a popular movie theater located in the heart of Wroclaw, Poland, inside the Sky Tower complex. The cinema is well-known for its state-of-the-art facilities, including a 4DX movie hall and VIP hall, which offer an immersive cinematic experience to movie-goers.</p>
                <p style={{ fontSize: '18px', fontFamily: 'rajdhani' }}>The <b>4DX</b> hall at Wroclaw Cinema is a unique feature that sets it apart from other movie theaters in Poland. This hall offers an exhilarating experience for movie enthusiasts by incorporating motion and special effects, such as wind, rain, and fog, to complement the on-screen action. This cutting-edge technology provides a fully immersive experience, making it feel like you're part of the movie.</p>
                <p style={{ fontSize: '18px', fontFamily: 'rajdhani' }}>For those seeking a more luxurious experience, the <b>VIP hall</b> at Wroclaw Cinema is the perfect option. This hall offers plush, comfortable seats with extra legroom, and a range of gourmet food and drink options, providing a first-class cinematic experience.</p>
                <p style={{ fontSize: '18px', fontFamily: 'rajdhani' }}>In addition to its top-notch movie halls, Wroclaw Cinema also boasts ample <b>parking</b> facilities, making it a convenient location for movie-goers who drive. The cinema's location within the Sky Tower complex also offers stunning views of the city, adding to the overall experience.</p>
            </div>
        </Box>
    );
}

export default Info;
import React from "react";
import { AppBar, Toolbar, Typography, Button, SvgIcon, Drawer, Box, Grid } from '@mui/material';
import '../../../static/frontend/index.css';
import DrinksSvg from '../../../static/frontend/svg/drinks.svg';
import BaseFoodSvg from '../../../static/frontend/svg/base_food.svg';
import VIPFoodSvg from '../../../static/frontend/svg/vip_food.svg';

const Bar = () => {
    return (
        <Box height="100vh" width="25vw" style={{ background: 'linear-gradient(to top left, #000000 50%, #171717 50%)', color: '#ffffff' }}>
            <div style={{ padding: '20px' }}>
                <h1>Cinema Bar</h1>
                <hr></hr>
                <Box display="flex" alignItems="center" mb={1}>
                    <div className={'icon'}>
                        <DrinksSvg width="40" height="40" />
                    </div>
                    <Typography variant="h2" fontFamily={'rajdhani'} fontSize={'35px'} paddingTop={'10px'}>Drinks</Typography>
                </Box>
                <Grid container spacing={0.5} style={{ marginBottom: '40px' }}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', mr: 1 }} />
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'}  >NA Drinks</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'}  >From 5.00 PLN</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', mr: 1 }} />
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'}  >Beer</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'}  >From 10.00 PLN</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', mr: 1 }} />
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'}  >Coctails</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'}  >From 15.00 PLN</Typography>
                    </Grid>
                </Grid>

                <Box display="flex" alignItems="center" mb={1}>
                    <div className={'icon'}>
                        <BaseFoodSvg width="40" height="40" />
                    </div>
                    <Typography variant="h2" fontFamily={'rajdhani'} fontSize={'35px'} paddingTop={'10px'}>Food</Typography>
                </Box>
                <Grid container spacing={0.5} style={{ marginBottom: '40px' }}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', mr: 1 }} />
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'}  >Chips</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'}  >10.00 PLN</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', mr: 1 }} />
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'}  >Popcorn</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'}  >From 15.00 PLN</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', mr: 1 }} />
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'}  >Nachos</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'}  >15.00 PLN</Typography>
                    </Grid>
                </Grid>

                <Box display="flex" alignItems="center" mb={1}>
                    <div className={'icon'}>
                        <VIPFoodSvg width="40" height="40" />
                    </div>
                    <Typography variant="h2" fontFamily={'rajdhani'} fontSize={'35px'} paddingTop={'10px'}>VIP Hall Food</Typography>
                </Box>
                <Grid container spacing={0.5} style={{ marginBottom: '40px' }}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', mr: 1 }} />
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'}  >Pasta</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'}  >From 30.00 PLN</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', mr: 1 }} />
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'}  >Sushi</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'}  >From 50.00 PLN</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', mr: 1 }} />
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'}  >Pizza</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'}  >From 50.00 PLN</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', mr: 1 }} />
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'}  >Steak</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'}  >60.00 PLN</Typography>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}

export default Bar;
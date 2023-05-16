import React from "react";
import { AppBar, Toolbar, Typography, Button, SvgIcon, Drawer, Box, Grid } from '@mui/material';
import '../../../static/frontend/index.css';
import ParkingSvg from '../../../static/frontend/svg/parking.svg';
import GlassesSvg from '../../../static/frontend/svg/glasses.svg';
import TicketsSvg from '../../../static/frontend/svg/tickets.svg';
import VIPSvg from '../../../static/frontend/svg/vip.svg';

const Pricing = () => {
    return (
        <Box height="100vh" width="25vw" bgcolor="#f0f0f0" style={{ background: 'linear-gradient(to top left, #000000 50%, #171717 50%)', color: '#ffffff' }}>
            <div style={{ padding: '20px' }}>
                <h1>Cinema Pricings</h1>
                <hr></hr>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <div className={'icon'}>
                                <ParkingSvg width="20" height="20" />
                            </div>
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'} paddingTop={'7px'}>Parking</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'} paddingTop={'7px'}>Free</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <div className={'icon'}>
                                <GlassesSvg width="20" height="20" />
                            </div>
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'} paddingTop={'7px'}>3D/4DX Glasses</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'} paddingTop={'7px'}>10.00 PLN</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <div className={'icon'}>
                                <TicketsSvg width="20" height="20" />
                            </div>
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'} paddingTop={'7px'}>Standard Ticket</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'} paddingTop={'7px'}>From 15.00 PLN</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                            <div className={'icon'}>
                                <VIPSvg width="20" height="20" />
                            </div>
                            <Typography variant="subtitle1" fontFamily={'rajdhani'} fontSize={'20px'} paddingTop={'7px'}>VIP Ticket</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" align="right" fontFamily={'rajdhani'} fontSize={'20px'} paddingTop={'7px'}>From 25.00 PLN</Typography>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}

export default Pricing;
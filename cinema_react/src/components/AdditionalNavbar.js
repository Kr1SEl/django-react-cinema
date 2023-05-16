import React, { useState, Fragment } from 'react';
import { AppBar, Toolbar, Typography, Button, SvgIcon, Drawer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import '../../static/frontend/index.css';
import PopcornSvg from '../../static/frontend/svg/popcorn.svg';
import CinemaSvg from '../../static/frontend/svg/cinema.svg';
import PriceSvg from '../../static/frontend/svg/price.svg';
import Bar from '../containers/App/BarPage';
import Info from '../containers/App/CinemaInfoPage';
import Pricing from '../containers/App/PricingsPage';

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: 'linear-gradient(to bottom, #343434, #000000)',
        height: 150
    },
    title: {
        flexGrow: 1,
    },
    button: {
        marginLeft: theme.spacing(2),
        fontSize: 18,
        color: '#ffffff',
        textDecoration: 'none',
        "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "1px",
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.common.white,
            visibility: "hidden",
            transform: "scaleX(0)",
            transition: "all 0.3s ease-in-out",
        },
        "&:hover::before": {
            visibility: "visible",
            transform: "scaleX(1)",
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

function AdditionalNavbar() {
    const classes = useStyles();
    const [openBar, setOpenBar] = useState(false);
    const [openPricings, setOpenPricings] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Button color="inherit" className={classes.button} onClick={() => setOpenInfo(true)}>
                    <div className={'icon'}>
                        <CinemaSvg width="20" height="20" />
                    </div>
                    About The Cinema
                </Button>
                <Button color="inherit" className={classes.button} onClick={() => setOpenPricings(true)}>
                    <div className={'icon-price'}>
                        <PriceSvg width="24" height="24" />
                    </div>
                    Price List
                </Button>
                <Button color="inherit" className={classes.button} onClick={() => setOpenBar(true)}>
                    <div className={'icon-bar'}>
                        <PopcornSvg width="24" height="24" />
                    </div>
                    Bar
                </Button>
            </Toolbar>
            <Drawer
                anchor='right'
                open={openBar}
                onClose={() => setOpenBar(false)}>
                <Bar />
            </Drawer>
            <Drawer
                anchor='right'
                open={openPricings}
                onClose={() => setOpenPricings(false)}>
                <Pricing />
            </Drawer>
            <Drawer
                anchor='right'
                open={openInfo}
                onClose={() => setOpenInfo(false)}>
                <Info />
            </Drawer>
        </AppBar>
    );
}

export default AdditionalNavbar;
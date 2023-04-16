import React from 'react';
import { AppBar, Toolbar, Typography, Button, SvgIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import '../../static/frontend/index.css';
import PopcornSvg from '../../static/frontend/svg/popcorn.svg';
import CinemaSvg from '../../static/frontend/svg/cinema.svg';
import PriceSvg from '../../static/frontend/svg/price.svg';

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

function Navbar() {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Button color="inherit" className={classes.button}>
                    <div className={'icon'}>
                        <CinemaSvg width="20" height="20" />
                    </div>
                    About The Cinema
                </Button>
                <Button color="inherit" className={classes.button}>
                    <div className={'icon-price'}>
                        <PriceSvg width="24" height="24" />
                    </div>
                    Price List
                </Button>
                <Button color="inherit" className={classes.button}>
                    <div className={'icon-bar'}>
                        <PopcornSvg width="24" height="24" />
                    </div>
                    Bar
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
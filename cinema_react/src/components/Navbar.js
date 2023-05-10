import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Drawer,
    Snackbar
} from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Account from '../containers/Auth/AccountPage';
import '../../static/frontend/index.css';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
import Alert from '@mui/lab/Alert';
import AccountSvg from '../../static/frontend/svg/account.svg';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: '#000000',
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 400,
            paddingRight: 400,
        },
    },
    title: {
        flexGrow: 1,
        fontFamily: 'gongo',
        fontSize: 40,
        color: '#ffffff',
        textDecoration: 'none'
    },
    button: {
        marginLeft: theme.spacing(4),
        fontFamily: 'gongo',
        fontSize: 20,
        color: '#ffffff',
        textDecoration: 'none',
        '&:hover': {
            color: '#DC4C64 !important',
        },
    },
    spacer: {
        flexGrow: 1,
    },
    icon: {
        marginRight: theme.spacing(1),
    },
}));

const Navbar = ({ logout, isAuthenticated }) => {
    const classes = useStyles();
    const [hover, setHover] = useState(false);
    const [dr, setDr] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(null);

    const logoutHandler = () => {
        setDr(false);
        logout();
        setOpen(true);
    };

    const guestLinks = () => (
        <Fragment>
            <Button
                onClick={() => setDr(true)}
                color="inherit"
                sx={{
                    marginLeft: "auto",
                    border: "2px solid #DC4C64",
                    fontFamily: "gongo",
                    fontSize: 20,
                    paddingLeft: "13px",
                    paddingRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.2s ease-in-out",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0px 0px 10px rgba(255,255,255,0.7)",
                        transform: "scale(1.05)",
                        backgroundColor: "transparent",
                    },
                }}
                style={{
                    transform: hover ? "scale(1.1)" : "scale(1)",
                    boxShadow: hover ? "0px 0px 10px rgba(255,255,255,0.7)" : "none"
                }}
                className={classes.loginButton}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className={'icon'}>
                    <AccountSvg width="22" height="22" />
                </div>
                <b>ACCOUNT</b>
            </Button>
            <Drawer
                anchor='right'
                open={dr}
                onClose={() => setDr(false)}>
                <Account />
            </Drawer>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <Button onClick={logoutHandler} color="inherit" sx={{
                marginLeft: "auto",
                border: "2px solid #DC4C64",
                fontFamily: "gongo",
                fontSize: 20,
                paddingLeft: "13px",
                paddingRight: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.2s ease-in-out",
                boxShadow: "none",
                "&:hover": {
                    boxShadow: "0px 0px 10px rgba(255,255,255,0.7)",
                    transform: "scale(1.05)",
                    backgroundColor: "transparent",
                },
            }}
                style={{
                    transform: hover ? "scale(1.1)" : "scale(1)",
                    boxShadow: hover ? "0px 0px 10px rgba(255,255,255,0.7)" : "none"
                }}>
                <div className={'icon'}>
                    <AccountSvg width="22" height="22" />
                </div>
                <b>LOGOUT</b>
            </Button>
        </Fragment>
    );

    return (
        <AppBar position="static" className={classes.appBar}>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setOpen(false)} severity={'success'} sx={{ width: '100%' }}>
                    You logged out successfully
                </Alert>
            </Snackbar>
            <Toolbar justifyсontent="space-between">
                <Link variant="h6" className={classes.title} to="/">
                    <b><span style={{ color: '#DC4C64' }}>Wroclaw</span> Cinema</b>
                </Link>
                <div>
                    <NavLink
                        style={isActive => ({
                            color: isActive ? "#DC4C64" : "white"
                        })}
                        color="inherit"
                        className={classes.button}
                        to="/movies"
                        underline="none"
                    >
                        <b>SCHEDULE</b>
                    </NavLink>
                    {isAuthenticated && (
                        <NavLink
                            style={isActive => ({
                                color: isActive ? "#DC4C64" : "white"
                            })}
                            color="inherit"
                            className={classes.button}
                            to="/tickets"
                            underline="none"
                        >
                            <b>MY TICKETS</b>
                        </NavLink>
                    )}
                    <NavLink
                        style={isActive => ({
                            color: isActive ? "#DC4C64" : "white"
                        })}
                        to="/promos"
                        color="inherit"
                        underline="none"
                        className={classes.button}>
                        <b>PROMOS</b>
                    </NavLink>
                </div>
                <div className={classes.spacer} />
                {isAuthenticated ? authLinks() : guestLinks()}
            </Toolbar >
        </AppBar >
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);

import React, { useState, Fragment } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Account from '../containers/Auth/AccountPage';
import '../../static/frontend/index.css';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
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
        textDecoration: 'none'
    },
    spacer: {
        flexGrow: 1,
    },
    loginButton: {
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
    }
}));

const Navbar = ({ logout, isAuthenticated }) => {
    const classes = useStyles();
    const [hover, setHover] = useState(false);
    const [dr, setDr] = useState(false);

    const logoutHandler = () => {
        setDr(false);
        logout();
    };

    const guestLinks = () => (
        <Fragment>
            <Button
                onClick={() => setDr(true)}
                color="inherit"
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
            <Button onClick={logoutHandler} color="inherit" className={classes.loginButton}>
                <div className={'icon'}>
                    <AccountSvg width="22" height="22" />
                </div>
                <b>LOGOUT</b>
            </Button>
        </Fragment>
    );

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar justifyсontent="space-between">
                <Link variant="h6" className={classes.title} to="/">
                    <b>Wroclaw Cinema</b>
                </Link>
                <div>
                    <Link
                        color="inherit"
                        underline="none"
                        className={classes.button}
                        to="/movies"
                        onMouseEnter={(e) => (e.target.style.color = "#DC4C64")}
                        onMouseLeave={(e) => (e.target.style.color = "white")}
                    >
                        <b>SCHEDULE</b>
                    </Link>
                    <Link
                        color="inherit"
                        className={classes.button}
                        to="/tickets"
                        underline="none"
                        onMouseEnter={(e) => (e.target.style.color = "#DC4C64")}
                        onMouseLeave={(e) => (e.target.style.color = "white")}>
                        <b>MY TICKETS</b>
                    </Link>
                    <Link
                        to="/promos"
                        color="inherit"
                        underline="none"
                        className={classes.button}
                        onMouseEnter={(e) => (e.target.style.color = "#DC4C64")}
                        onMouseLeave={(e) => (e.target.style.color = "white")}>
                        <b>PROMOS</b>
                    </Link>
                </div>
                <div className={classes.spacer} />
                {isAuthenticated ? authLinks() : guestLinks()}
            </Toolbar>
        </AppBar >
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);

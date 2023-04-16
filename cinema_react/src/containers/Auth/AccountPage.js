import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import '../../../static/frontend/index.css';
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ResetPasswordPage from "./ResetPasswordPage";


const SharpButton = withStyles({
    root: {
        borderRadius: 0,
    },
})(Button);

const Account = () => {
    const [activeButton, setActiveButton] = useState(1);

    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    const loginPage = () => (
        <Fragment>
            <LoginPage />
            <Grid container justifyContent='space-between'>
                <Grid item>
                    <Typography variant='body2' style={{ marginLeft: '15px' }}>
                        Forgot your password?{' '}
                        <Button
                            variant="text"
                            style={{
                                color: 'primary',
                                textDecoration: 'underline',
                                textTransform: 'none',
                                padding: 0,
                                minWidth: 0,
                                margin: 0,
                                fontSize: 'inherit',
                                fontWeight: 'inherit',
                                lineHeight: 'inherit',
                            }}
                            onClick={() => handleButtonClick(3)}
                        >
                            Reset Password
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
        </Fragment>
    );

    const signupPage = () => (
        <SignUpPage />
    );

    const resetPage = () => (
        <ResetPasswordPage />
    );

    return (
        <div>
            <SharpButton
                className="full-width-button"
                variant={activeButton === 1 ? "contained" : "outlined"}
                color={activeButton === 1 ? "secondary" : "primary"}
                onClick={() => handleButtonClick(1)}
            >
                Log In
            </SharpButton>
            <SharpButton
                className="full-width-button"
                variant={activeButton === 2 ? "contained" : "outlined"}
                color={activeButton === 2 ? "secondary" : "primary"}
                onClick={() => handleButtonClick(2)}
            >
                Sign Up
            </SharpButton>
            {activeButton === 1 ? loginPage() : activeButton === 2 ? signupPage() : activeButton === 3 ? resetPage() : null}
        </div>
    );
};

export default Account;
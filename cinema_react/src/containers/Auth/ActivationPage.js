import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../actions/auth";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
} from '@material-ui/core';


const Activation = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);


    const verifyAccount = (e) => {
        const uid = match.params.uid;
        const token = match.params.token;
        console.log(uid)
        console.log(token)
        verify(uid, token);
        setVerified(true);
    };


    if (verified) {
        return (<Container maxWidth='xs'>
            <div
                className='d-flex flex-colun justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Your account was succesfully verified</h1>
                <h2>You can now login to your account</h2>
                <Grid item xs={12}>
                    <Link variant="h6" to="/">
                        Home Page
                    </Link>
                </Grid>
            </div>
        </Container>)
    }

    return (
        <Container maxWidth='xs'>
            <div
                className='d-flex flex-colun justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your account</h1>
                <Grid item xs={12}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        onClick={verifyAccount}
                        fullWidth
                    >
                        Verify
                    </Button>
                </Grid>
            </div>
        </Container>
    );
};

export default connect(null, { verify })(Activation);
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../actions/auth";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
} from '@material-ui/core';


const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        reset_password(email);
        setRequestSent(true);
    };

    // if (requestSent) {

    // }

    return (
        <Container maxWidth='xs'>
            <div className='mt-5'>
                <Typography variant='h4' align='center' gutterBottom>
                    Reset password
                </Typography>
                <Typography variant='body1' align='center'>
                    You will receive an email with a link to reset pasword
                </Typography>
                <br />
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                label='Email'
                                name='email'
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                fullWidth
                            >
                                Reset Password
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default connect(null, { reset_password })(ResetPassword);
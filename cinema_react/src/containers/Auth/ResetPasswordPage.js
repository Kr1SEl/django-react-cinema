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
    IconButton,
    Snackbar
} from '@mui/material';
import Alert from '@mui/lab/Alert';
import { LoadingButton } from "@mui/lab";


const ResetPassword = ({ reset_password }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
    });
    const [loading, setLoading] = useState(false);

    const { email } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await reset_password(email);
        setLoading(false);
        if (success) {
            setMessage('Reset link was sent to your email!');
        } else {
            setMessage('E-mail is not registered!');
        }
        setAlertVisible(true);
    };


    return (
        <Container maxWidth='xs'>
            <br />
            {
                alertVisible && (
                    <Alert
                        severity={message === 'Reset link was sent to your email!' ? 'success' : 'error'}
                        onClose={() => setAlertVisible(false)}
                    >
                        {message}
                    </Alert>
                )
            }
            <br />
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
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                loading={loading}
                            >
                                Reset Password
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default connect(null, { reset_password })(ResetPassword);
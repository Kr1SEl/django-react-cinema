import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
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
import '../../../static/frontend/index.css';
import { LoadingButton } from "@mui/lab";


const Login = ({ login, isAuthenticated }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            setLoading(true);
            const success = await login(email, password);
            setLoading(false);
            if (success) {
                setMessage('Login successful!');
            } else {
                setMessage('Login failed!');
            }
            setAlertVisible(true);
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Container maxWidth='xs'>
            <br />
            {
                alertVisible && (
                    <Alert
                        severity={message === 'Login successful!' ? 'success' : 'error'}
                        onClose={() => setAlertVisible(false)}
                    >
                        {message}
                    </Alert>
                )
            }
            <br />
            <div className='mt-5'>
                <Typography variant='h4' align='center' fontFamily={'rajdhani'} gutterBottom>
                    <b>Sign In</b>
                </Typography>
                <Typography variant='body1' align='center' fontFamily={'rajdhani'} >
                    Sign into your Account
                </Typography>
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
                            <TextField
                                variant='outlined'
                                fullWidth
                                label='Password'
                                type='password'
                                name='password'
                                value={password}
                                onChange={onChange}
                                required
                                inputProps={{
                                    minLength: 8,
                                    maxLength: 20,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton
                                type='submit'
                                variant='contained'
                                color='primary'
                                fullWidth
                                loading={loading}
                            >
                                Sign In
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    );
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
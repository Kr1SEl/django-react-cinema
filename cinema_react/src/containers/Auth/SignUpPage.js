import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import Alert from '@mui/lab/Alert';
import { LoadingButton } from "@mui/lab";


const Signup = ({ signup, isAuthenticated }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email) ? '' : 'Invalid email address';
    };

    const { name, email, password, re_password } = formData;

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmailError(validateEmail(value));
        }
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password === re_password) {
            if (!Boolean(emailError)) {
                setLoading(true);
                const success = await signup(name, email, password, re_password);
                setLoading(false);
                if (success) {
                    setMessage('Account created! Check your e-mail!');
                } else {
                    setMessage('Account creation failed. Please, try again');
                }
                setAlertVisible(true);
            }
        } else {
            setError(true);
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <Container maxWidth='xs'>
            <br />
            {
                alertVisible && (
                    <Alert
                        severity={message === 'Account created! Check your e-mail!' ? 'success' : 'error'}
                        onClose={() => setAlertVisible(false)}
                    >
                        {message}
                    </Alert>
                )
            }
            <br />
            <div className='mt-5'>
                {error && (
                    <Typography variant='body2' color='error'>
                        Invalid email or password. Please try again.
                    </Typography>
                )}
                <Typography variant='h4' align='center' gutterBottom>
                    Sign Up
                </Typography>
                <Typography variant='body1' align='center'>
                    Create an account
                </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                label='Name'
                                name='name'
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                label='Email'
                                name='email'
                                value={email}
                                onChange={onChange}
                                required
                                error={Boolean(emailError)}
                                helperText={emailError}
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
                                error={error}
                                inputProps={{
                                    minLength: 8,
                                    maxLength: 20,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                label='Confirm Password'
                                type='password'
                                name='re_password'
                                value={re_password}
                                onChange={onChange}
                                required
                                error={error}
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
                                Sign Up
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);
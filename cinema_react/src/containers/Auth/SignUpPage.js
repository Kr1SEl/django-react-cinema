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
    Link,
} from '@material-ui/core';


const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
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

    // const onChange = (e) =>
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmailError(validateEmail(value));
        }
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (password === re_password) {
            if (!Boolean(emailError)) {
                signup(name, email, password, re_password);
                setAccountCreated(true);
            }
        } else {
            setError(true);
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    // if (accountCreated) {
    //     return <Redirect to='/' />
    // }

    return (
        <Container maxWidth='xs'>
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
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                fullWidth
                            >
                                Sign Up
                            </Button>
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
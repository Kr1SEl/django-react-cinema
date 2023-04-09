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
} from '@material-ui/core';


const Login = ({ login, isAuthenticated }) => {
    const [loginSent, setLoginSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        setLoginSent(true);
        login(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    if (!isAuthenticated && loginSent) {
        return (
            <Container maxWidth='xs'>
                <Typography variant='body2' color='error'>
                    Invalid email or password. Please try again.
                </Typography>
                <div className='mt-5'>
                    <Typography variant='h4' align='center' gutterBottom>
                        Sign In
                    </Typography>
                    <Typography variant='body1' align='center'>
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
                                    error={true}
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
                                    error={true}
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
                                    Sign In
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    } else {
        return (
            <Container maxWidth='xs'>
                <div className='mt-5'>
                    <Typography variant='h4' align='center' gutterBottom>
                        Sign In
                    </Typography>
                    <Typography variant='body1' align='center'>
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
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                >
                                    Sign In
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
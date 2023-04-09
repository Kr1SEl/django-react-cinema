import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confim } from "../../actions/auth";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
} from '@material-ui/core';


const ResetPasswordConirm = ({ match, reset_password_confim }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '', re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (new_password === re_new_password) {
            const uid = match.params.uid;
            const token = match.params.token;

            reset_password_confim(uid, token, new_password, re_new_password);
            setRequestSent(true);
        }
    };

    // if (requestSent) {

    // }

    return (
        <Container maxWidth='xs'>
            <div className='mt-5'>
                <Typography variant='h4' align='center' gutterBottom>
                    Reset Password
                </Typography>
                <Typography variant='body1' align='center'>
                    You will receive an email with a link to reset pasword
                </Typography>
                <br></br>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='filled'
                                fullWidth
                                label='New Password'
                                type='password'
                                color="primary"
                                name='new_password'
                                value={new_password}
                                onChange={onChange}
                                required
                                inputProps={{
                                    minLength: 8,
                                    maxLength: 20,
                                }}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '4px'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='filled'
                                fullWidth
                                label='Confirm New Password'
                                type='password'
                                color="primary"
                                name='re_new_password'
                                value={re_new_password}
                                onChange={onChange}
                                required
                                inputProps={{
                                    minLength: 8,
                                    maxLength: 20,
                                }}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                    color: 'black'
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
                                Reset Password
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default connect(null, { reset_password_confim })(ResetPasswordConirm);
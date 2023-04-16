import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confim } from "../../actions/auth";
import Alert from '@mui/lab/Alert';
import '../../../static/frontend/index.css';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from "@mui/lab";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Snackbar,
    IconButton,
    Card,
    CardContent
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex!important',
        flexDirection: 'column!important',
        alignItems: 'center!important',
        justifyContent: 'center!important',
        minHeight: '55vh!important',
    },
    heading: {
        marginBottom: `${theme.spacing(3)} !important`,
        fontFamily: "gongo!important",
    },
    card: {
        width: '100%',
        padding: `${theme.spacing(3)} !important`,
        borderRadius: '12px!important',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)!important',
    },
    form: {
        width: '100%',
    },
    textField: {
        marginTop: `${theme.spacing(2)} !important`,
        backgroundColor: 'white',
        borderRadius: '4px',
        color: 'black'
    },
    button: {
        marginTop: `${theme.spacing(4)} !important`,
        padding: `${theme.spacing(1, 2)} !important`,
    },
    icon: {
        marginRight: `${theme.spacing(1)} !important`,
    },
}));

const ResetPasswordConirm = ({ match, reset_password_confim }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [severity, setSeverity] = useState('error');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '', re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (new_password === re_new_password) {
            const uid = match.params.uid;
            const token = match.params.token;
            setLoading(true);
            const success = await reset_password_confim(uid, token, new_password, re_new_password);
            setLoading(false);
            if (success) {
                setMessage('Password was succesfully reset. You can login now!');
                setSeverity('success');
                setIsButtonDisabled(true);
            } else {
                setMessage('Password reset failed!');
                setSeverity('error');
            }
            setOpen(true);
        } else {
            setMessage('Password reset failed!');
            setSeverity('error');
            setOpen(true);
        }
    };


    return (
        <Container maxWidth="xs" className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                    <Typography variant="h4" align="center" className={classes.heading}>
                        <b>Reset Password</b>
                    </Typography>
                    <form onSubmit={onSubmit} className={classes.form}>
                        <TextField
                            variant="filled"
                            fullWidth
                            label="New Password"
                            type="password"
                            name='new_password'
                            value={new_password}
                            onChange={onChange}
                            className={classes.textField}
                            required
                            inputProps={{
                                minLength: 8,
                                maxLength: 20,
                            }}
                        />
                        <TextField
                            variant="filled"
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            name='re_new_password'
                            value={re_new_password}
                            onChange={onChange}
                            className={classes.textField}
                            required
                            inputProps={{
                                minLength: 8,
                                maxLength: 20,
                            }}
                        />
                        <Box textAlign="center">
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.button}
                                loading={loading}
                                disabled={isButtonDisabled}
                            >
                                <LockOpenIcon className={classes.icon} />
                                Reset Password
                            </LoadingButton>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default connect(null, { reset_password_confim })(ResetPasswordConirm);

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, Box, Snackbar, CardContent, TextField, Typography, Button, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { LoadingButton } from "@mui/lab";
import Alert from '@mui/lab/Alert';
import { postTicketForSessionId } from "../../actions/api";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        minWidth: 400,
        marginTop: theme.spacing(8),
        padding: theme.spacing(4),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: `${theme.spacing(4)} !important`,
        padding: `${theme.spacing(1, 2)} !important`,
    },
    icon: {
        marginRight: `${theme.spacing(1)} !important`,
    },
}));

const AnonymousForm = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [ticketsBought, setTicketsBought] = useState(false);
    const [message, setMessage] = useState('Ooops... Something went wrong, please try again');
    const [emailError, setEmailError] = useState('');
    const [severity, setSeverity] = useState('error');
    const [phoneError, setPhoneError] = useState('');
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '', surname: '', email: '', phone: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!Boolean(emailError) && !Boolean(phoneError)) {
            setButtonLoading(true);
            const data = props.location.state.data
            for (let i = 0; i < data.selectedSeats.length; i++) {
                const success = await postTicketForSessionId(data.movie, name, surname, email, phone, data.selectedSeats[i], data.sessionID, data.movie.price);
                if (success) {
                    setButtonLoading(false);
                    setTicketsBought(true);
                    setSeverity('success');
                    setOpen(true);
                    setMessage('Tickets Reserved Succesfully. Check out your email!');
                }
            }
        }
    }

    useEffect(() => {
        if (props.isAuthenticated) {
            history.push('/movies');
        }
        if (props.location.state === undefined) {
            history.push('/movies');
        }
    }, [props.isAuthenticated]);

    const { name, surname, email, phone } = formData;

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email) ? '' : 'Invalid email address';
    };

    function validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\+[1-9]\d{0,3}[ -]?\d{4,12}$/;
        return phoneRegex.test(phoneNumber) ? '' : 'Invalid phone number';
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmailError(validateEmail(value));
        }
        if (name === 'phone') {
            setPhoneError(validatePhoneNumber(value));
        }
        setFormData({ ...formData, [name]: value });
    };


    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Reservation Form
                    </Typography>
                    <Typography variant='body1' align='center'>
                        Fill this form to book tickets
                    </Typography>
                    <form onSubmit={onSubmit} className={classes.form} noValidate>
                        <TextField
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            name='name'
                            value={name}
                            onChange={onChange}
                            fullWidth
                            required />
                        <TextField
                            label="Surname"
                            variant="outlined"
                            margin="normal"
                            name='surname'
                            value={surname}
                            onChange={onChange}
                            fullWidth
                            required />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            name='email'
                            value={email}
                            onChange={onChange}
                            error={Boolean(emailError)}
                            fullWidth
                            required />
                        <TextField
                            label="Telephone Number"
                            type="tel"
                            variant="outlined"
                            margin="normal"
                            name='phone'
                            value={phone}
                            onChange={onChange}
                            error={Boolean(phoneError)}
                            fullWidth
                            required />
                        <Box textAlign="center">
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.button}
                                loading={buttonLoading}
                                disabled={ticketsBought}
                            // onClick={bookSeats}
                            >
                                <LocalActivityIcon className={classes.icon} />
                                Book Tickets
                            </LoadingButton>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(AnonymousForm);

// export default AnonymousForm;

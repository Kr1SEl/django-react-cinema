import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../actions/auth";
import {
    Container,
    Typography,
    Button,
    Box,
    Snackbar,
    Card,
    CardContent
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { LoadingButton } from "@mui/lab";
import Alert from '@mui/lab/Alert';

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
    button: {
        marginTop: `${theme.spacing(4)} !important`,
        padding: `${theme.spacing(1, 2)} !important`,
    },
    icon: {
        marginRight: `${theme.spacing(1)} !important`,
    },
}));

const Activation = ({ verify, match }) => {
    const classes = useStyles();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [severity, setSeverity] = useState('error');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');


    const verifyAccount = async (e) => {
        const uid = match.params.uid;
        const token = match.params.token;
        setLoading(true);
        const success = await verify(uid, token);
        setLoading(false);
        if (success) {
            setMessage('Verification succesfull. Now you can login to your account!');
            setSeverity('success');
            setIsButtonDisabled(true);
        } else {
            setMessage('Verification failed!');
            setSeverity('error');
        }
        setOpen(true);
    };


    return (
        <Container maxWidth="sm" className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                    <Typography variant="h4" align="center" className={classes.heading}>
                        <b>Account Verification</b>
                    </Typography>
                    <Typography variant="body1" align="center">
                        Click the button below to verify your account.
                    </Typography>
                    <Box textAlign="center">
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={verifyAccount}
                            loading={loading}
                            disabled={isButtonDisabled}
                        >
                            <CheckCircleOutlineIcon className={classes.icon} />
                            Verify
                        </LoadingButton>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default connect(null, { verify })(Activation);

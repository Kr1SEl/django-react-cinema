import React, { useState, useEffect } from 'react';
import '../../../static/frontend/index.css';
import { makeStyles } from '@mui/styles';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box
} from '@mui/material';
import { getTicketsForUser } from "../../actions/api";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
    card: {
        marginBottom: theme.spacing(4),
    },
    media: {
        height: 400,
    },
    qrCode: {
        height: 250,
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh',
        textAlign: 'center',
    },
}));


const TicketsPage = ({ match, isAuthenticated, user }) => {
    const classes = useStyles();
    const history = useHistory();
    const [tickets, setTickets] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            history.push("/movies");
        }
        let isMounted = true;
        setIsLoading(true);

        const fetchData = async () => {
            const tickets = await getTicketsForUser();
            if (isMounted) {
                setTickets(tickets);
                setIsLoading(false);
            }
            console.log(tickets);
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    if (tickets === null) {
        return (isLoading && (<div className="loader" />))
    } else if (tickets.length === 0) {
        return (
            <Box className={classes.root}>
                <Typography className='neonSmallText'>
                    Ooops... <br />It seems you have no tickets yet
                </Typography>
            </Box>
        );
    } else {
        return (
            <Container className={classes.container}>
                <Grid container spacing={4}>
                    {tickets.map((ticket, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image={`data:image/jpeg;base64,${ticket.poster}`}
                                    title={ticket.movie_name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {ticket.movie_name}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" component="p">
                                        Start Date: {new Date(ticket.start_time).toLocaleString()}
                                    </Typography>
                                    <CardMedia
                                        className={classes.qrCode}
                                        image={`data:image/jpeg;base64,${ticket.qr_code}`}
                                        title={'Ticket QR Code'}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {})(TicketsPage);

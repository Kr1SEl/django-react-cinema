import '../../../static/frontend/index.css';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { getMovieInfoBySessionId } from "../../actions/api";
import { postTicketForSessionId } from "../../actions/api";
import Alert from '@mui/lab/Alert';
import { connect } from 'react-redux';
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
import { makeStyles } from '@mui/styles';
import { LoadingButton } from "@mui/lab";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: `${theme.spacing(4)} !important`,
        padding: `${theme.spacing(1, 2)} !important`,
        '&:disabled': {
            backgroundColor: '#E0E0E0 !important',
            color: '#808080 !important',
            opacity: '1 !important',
        },
    },
    icon: {
        marginRight: `${theme.spacing(1)} !important`,
    },
}));


const seats_1 = Array.from({ length: 10 * 10 }, (_, i) => i)
const seats_2 = Array.from({ length: 8 * 8 }, (_, i) => i)
const seats_3 = Array.from({ length: 4 * 4 }, (_, i) => i)

const SeatPickerPage = ({ match, isAuthenticated, user }) => {
    const history = useHistory();
    const classes = useStyles();
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [selectedSeats, setSelectedSeats] = useState([])
    const [selectedLayout, setSelectedLayout] = useState([])
    const [layoutArray, selLayoutArrat] = useState([])
    const [isDataLoading, setIsDataLoading] = useState(true)
    const date = new Date();
    const dayOfWeek = date.getDay();


    useEffect(async () => {
        const movie = await getMovieInfoBySessionId(match.params.sessionID);
        console.log(movie);
        if (movie.name === null) {
            setIsDataLoading(false);
            history.push("/movies");
        } else {
            setSelectedMovie(movie);
            switch (movie.sits_layout) {
                case 1:
                    setSelectedLayout('seats_1');
                    selLayoutArrat(seats_1);
                    break;
                case 2:
                    setSelectedLayout('seats_2');
                    selLayoutArrat(seats_2);
                    break;
                case 3:
                    setSelectedLayout('seats_3');
                    selLayoutArrat(seats_3);
                    break;
                default:
                    selLayoutArrat(seats_2);
                    setSelectedLayout('seats_2');
            }
            setIsDataLoading(false);
        }
    }, []);

    return (
        <div className="App">
            <ShowCase />
            <Cinema
                movie={selectedMovie}
                selectedSeats={selectedSeats}
                isLoading={isDataLoading}
                onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
                selectedLayout={selectedLayout}
                layoutArray={layoutArray}
                classes={classes}
                isAuthenticated={isAuthenticated}
                user={user}
                sessionID={match.params.sessionID}
            />
            {selectedMovie && selectedSeats.length >= 3 && isAuthenticated && (
                <div>
                    <p className="info">
                        You have selected <span className="count">{selectedSeats.length}</span>{' '}
                        seats with the total price of{' '}
                        <span className="total">
                            {((selectedSeats.length * selectedMovie.price) * 0.8).toFixed(2)}PLN
                        </span>
                    </p>
                    <p className="info">
                        Total discount of <span className="count">20%</span> applied
                    </p>
                </div>
            )}
            {selectedMovie && selectedSeats.length > 0 && selectedSeats.length < 3 && isAuthenticated && dayOfWeek >= 1 && dayOfWeek <= 4 && (
                <div>
                    <p className="info">
                        You have selected <span className="count">{selectedSeats.length}</span>{' '}
                        seats with the total price of{' '}
                        <span className="total">
                            {((selectedSeats.length * selectedMovie.price) * 0.85).toFixed(2)}PLN
                        </span>
                    </p>
                    <p className="info">
                        Total discount of <span className="count">15%</span> applied
                    </p>
                </div>
            )}
            {selectedMovie && (
                <p className="info">
                    You have selected <span className="count">{selectedSeats.length}</span>{' '}
                    seats with the total price of{' '}
                    <span className="total">
                        {selectedSeats.length * selectedMovie.price}PLN
                    </span>
                </p>)}
        </div>
    )
}

function ShowCase() {
    return (
        <ul className="ShowCase">
            <li>
                <span className="seat" /> <small>Free</small>
            </li>
            <li>
                <span className="seat selected" /> <small>Selected</small>
            </li>
            <li>
                <span className="seat occupied" /> <small>Occupied</small>
            </li>
        </ul>
    )
}

function Cinema({ movie, selectedSeats, isLoading, onSelectedSeatsChange, selectedLayout, layoutArray, classes, isAuthenticated, user, sessionID }) {
    const history = useHistory();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [ticketsBought, setTicketsBought] = useState(false);
    const [open, setOpen] = useState(false);
    function handleSelectedState(seat) {
        const isSelected = selectedSeats.includes(seat)
        if (isSelected) {
            onSelectedSeatsChange(
                selectedSeats.filter(selectedSeat => selectedSeat !== seat),
            )
        } else {
            onSelectedSeatsChange([...selectedSeats, seat])
        }
    }

    async function bookSeats() {
        setButtonLoading(true);
        if (isAuthenticated) {
            for (let i = 0; i < selectedSeats.length; i++) {
                let fin_price = 0;
                if (selectedSeats.length >= 3) {
                    fin_price = movie.price * 0.8
                } else {
                    fin_price = movie.price
                }
                const success = await postTicketForSessionId(movie, user.name, '', user.email, '', selectedSeats[i], sessionID, fin_price);
                if (success) {
                    movie.occupied.push(selectedSeats[i])
                }
            }
        } else {
            const data = {
                movie: movie,
                selectedSeats: selectedSeats,
                sessionID: sessionID
            };
            history.push({
                pathname: '/movie/seats-reservation-form',
                state: { data }
            });
        }
        setButtonLoading(false);
        setTicketsBought(true);
        setOpen(true);
    }

    return (
        <div className="Cinema">
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setOpen(false)} severity={'success'} sx={{ width: '100%', height: '100%' }}>
                    Tickets Reserved Succesfully. Check out your email!
                </Alert>
            </Snackbar>
            {isLoading && (<div className="loader" />)}
            {movie && (
                <div>
                    <div className="screen" />
                    <div className={selectedLayout}>
                        {layoutArray.map(seat => {
                            const isSelected = selectedSeats.includes(seat + 1);
                            const isOccupied = movie.occupied.includes(seat + 1);
                            if (!ticketsBought) {
                                return (
                                    <span
                                        tabIndex="0"
                                        key={seat + 1}
                                        className={clsx('seat', isSelected && 'selected', isOccupied && 'occupied')}
                                        onClick={isOccupied ? null : () => handleSelectedState(seat + 1)}
                                    />
                                );
                            } else {
                                return (
                                    <span
                                        tabIndex="0"
                                        key={seat + 1}
                                        className={clsx('seat', isSelected && 'selected', isOccupied && 'occupied')}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            )}
            <Box textAlign="center">
                <LoadingButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                    loading={buttonLoading}
                    disabled={selectedSeats.length === 0 || ticketsBought}
                    onClick={bookSeats}
                >
                    <LocalActivityIcon className={classes.icon} />
                    Book Tickets
                </LoadingButton>
            </Box>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {})(SeatPickerPage);
import { useHistory } from "react-router-dom";
import {
    Button, Box, Container
} from '@mui/material';
import { getSessionsByMovieId } from "../actions/api";
import React, { useState, useEffect } from "react";

const SessionTable = ({ movieId }) => {

    const history = useHistory();

    const [sessions, setSessions] = useState([])

    const handleSessionClick = (id) => {
        history.push(`/movie/seats/${id}`);
    };

    const handleBackClick = () => {
        history.push(`/`);
    };

    const isSessionValid = (startingTime) => {
        const currentTime = new Date();
        const sessionTime = new Date(startingTime);
        return currentTime < sessionTime;
    };

    useEffect(async () => {
        const sessionData = await getSessionsByMovieId(movieId);
        const sortedSessions = sessionData.sort((a, b) => new Date(a.starting_time) - new Date(b.starting_time));
        setSessions(sortedSessions);
    }, []);

    const sessionsByDate = sessions.reduce((acc, session) => {
        if (isSessionValid(session.starting_time)) {
            const date = new Date(session.starting_time).toLocaleDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(session);
        }
        return acc;
    }, {});

    return (
        <>
            <h2>Upcoming Sessions</h2>
            {Object.entries(sessionsByDate).map(([date, sessionGroup]) =>
                <Box key={date}>
                    <h2>{date}</h2>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                        {sessionGroup.map((session) =>
                            <Button
                                key={session.id}
                                variant="outlined"
                                onClick={() => handleSessionClick(session.id)}
                            >
                                {new Date(session.starting_time).toLocaleTimeString()}
                            </Button>
                        )}
                    </Box>
                </Box>
            )}
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button variant="outlined" onClick={handleBackClick}>Back</Button>
            </Box>
        </>
    )
}

export default SessionTable;

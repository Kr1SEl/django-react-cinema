import { useHistory } from "react-router-dom";
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter
} from '@mui/material';
import { getSessionsByMovieId } from "../actions/api";
import React, { useState, useEffect } from "react";


const SessionTable = ({ movieId }) => {

    const history = useHistory();

    const [sessions, setSessions] = useState([])

    const handleSessionClick = (id) => {
        history.push(`/tickets`);
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
        const sessions = await getSessionsByMovieId(movieId);
        setSessions(sessions);
    }, []);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className="tableSessions">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className="tableCell">
                                <div className="tableText">
                                    Upcoming Sessions
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <TableContainer component={Paper}>
                <Table className="tableSessions">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell">
                                <div className="tableText">
                                    Date and Time
                                </div>
                            </TableCell>
                            <TableCell align="center" className="tableCell">
                                <div className="tableText">
                                    Hall Number
                                </div>
                            </TableCell>
                            <TableCell align="center" className="tableCell">
                                <div className="tableText">
                                    Action
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sessions.map(
                            (session) =>
                                isSessionValid(session.starting_time) && (
                                    <TableRow key={session.id}>
                                        <TableCell className="tableCell">
                                            <div className="tableText">
                                                {new Date(session.starting_time).toLocaleString()}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            <div className="tableText">
                                                {session.hall_id_id}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            <div className="tableText">
                                                <Button className="buttonMain" onClick={() => handleSessionClick(session.id)}>
                                                    Select
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper}>
                <Table className="tableSessions">
                    <TableFooter>
                        <TableRow>
                            <TableCell className="tableCell">
                                <div className="tableText">
                                    <Button className="buttonMain" onClick={() => handleBackClick()}>Back</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}


export default SessionTable;
import React from "react";
import styles from './siahl.module.css'

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

let SUBSCRIBE_URL = "https://calendar.google.com/calendar/render?cid=";
let SCHEDULE_URL = "https://stats.sharksice.timetoscore.com/display-schedule?league=1&stat_class=1";

export default class App extends React.Component {
    state = {
        divisions: {},
        season: '',
        anchorEl: null
    };


    componentDidMount() {
        fetch('/siahl_calendars2.json')
            .then(data => data.json())
            .then(divisions => {
                this.setState({ divisions });
            });
    }

    buildCalUrl = (team_id) => {
        return `${SUBSCRIBE_URL}webcal://stats.sharksice.timetoscore.com/team-cal.php?team=${team_id}%26season=${this.seasonId()}%26tlev=0%26tseq=0%26format=iCal`;
    }

    buildScheduleUrl = (team_id) => {
        return `${SCHEDULE_URL}&team=${team_id}&season=${this.seasonId()}`;
    }

    renderDivision = (division, teams) => {

        return (
            <Table size="small" aria-label="simple table" className={styles.styled_table}>
                <TableHead>
                    <TableRow>
                        <TableCell>{division} Schedules</TableCell>
                        <TableCell align="right">Calendar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(teams).map(([team, id], index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link variant="body1" href={this.buildScheduleUrl(id)}>{team}</Link>
                            </TableCell>
                            <TableCell align="right">
                                <Button variant="contained" onClick={() => window.open(this.buildCalUrl(id))}>Subscribe</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    renderCalendarTable = () => {
        let {
            divisions
        } = this.state;

        return (
            Object.entries(divisions).map(([division, teams], index) => {
                return this.renderDivision(division, teams);
            })
        );
    }

    onSeasonChange = (e) => {
        this.setState({ season: e.target.value })
    }

    seasonId = () => {
        let {
            season
        } = this.state;
        return parseInt(season) | 0;

    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: event.null });
    };

    renderHeader = () => {
        let {
            anchorEl,
            season
        } = this.state;
        return (
            <Box sx={{ flexGrow: 1 }} className={styles.box}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            SIAHL Calendars
                        </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <Box sx={{ padding: 1 }}>
                                    <TextField
                                        id="outlined-helperText"
                                        label="Season ID"
                                        value={season}
                                        helperText="Leave empty for current season. Fall 2023 is season 60."
                                    />
                                </Box>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>)
    }

    render() {
        return (
            <section className={styles.parent}>
                {this.renderHeader()}
                {this.renderCalendarTable()}
            </section>
        );
    }
}
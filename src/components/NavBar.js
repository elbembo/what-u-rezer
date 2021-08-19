import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Avatar, Tooltip, Toolbar, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    a: {

        fontWeight: 700,
        textDecoration: 'none',
        margin: '5px 20px',
        color:'#fff'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


function NavBar(props) {
    const classes = useStyles();
    const { authedUser, users } = props;
    const logout = e => {
        props.setAuthedUser(null);
      };
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.root}>
                    <NavLink exact to="/" className={classes.a}>
                        Home
                    </NavLink>
                    <NavLink exact to="/add" className={classes.a}>
                        Create a Poll
                    </NavLink>

                    <NavLink exact to="/leaderboard" className={classes.a}>
                        Leaderboard
                    </NavLink>

                </Typography>

                <Tooltip title={users[authedUser].name} aria-label={users[authedUser].id}>
                    <Avatar alt="Cindy Baker" src={users[authedUser].avatarURL} />
                </Tooltip>
                <Button color="inherit" onClick={logout}>Logout </Button>
            </Toolbar>
        </AppBar>
    )
}

function mapStateToProps({ users, authedUser }) {
    return {
        authedUser,
        users
    };
}

export default connect(
    mapStateToProps,
    { setAuthedUser }
)(NavBar);


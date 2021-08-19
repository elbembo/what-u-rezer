import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { AvatarGroup } from '@material-ui/lab';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {Tooltip, Avatar, Card, CardHeader, CardContent, CardMedia, Grid, Typography, LinearProgress, Box, Button, Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginBottom: '10px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto 1',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 200,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },

    title: {
        backgroundColor: '#00000094'

    },
    h1: {
        alignContent: 'center',
        textAlign: 'center'
    }
}));
const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 40,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#e91e63',
    },
  }))(LinearProgress);
function Questions(props) {
    const classes = useStyles();
    const {
        author,
        question,
        notFound,
        users,
        authedUser
    } = props;
    if (notFound === true) {
        return (
            <Grid >
                <Paper className={classes.h1}  >
                    <Typography variant="h1" component="h2" gutterBottom>
                        404
                    </Typography>
                    <Typography variant="h1" component="h2" gutterBottom>
                        Page not found
                    </Typography>

                </Paper>
            </Grid>
        )
    } else {
        const opOne = Math.round((question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)
        const opTwo = Math.round((question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)
        console.log(users)
        return (
            <Grid>
                <Paper>
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h4" variant="h4">
                                    Would You Rather...?
                                </Typography>

                                <Box display="flex" alignItems="center">
                                    <Box width="100%" mr={1}>
                                    <Typography component="h5" variant="h5">
                                    {question.optionOne.votes.includes(authedUser) ? (<CheckCircleIcon htmlColor="#4caf50"/>) :''}
                                        {question.optionOne.text}
                                        </Typography>
                                        <BorderLinearProgress variant="determinate" value={opOne} />
                                    </Box>
                                    <Box minWidth={35}>
                                        <Typography variant="body2" color="textSecondary">{`${Math.round(
                                            opOne,
                                        )}%`}</Typography>
                                    </Box>

                                </Box>
                                <Box display="flex" >
                                    <Typography variant="body2" color="textSecondary" >
                                        votes :
                                    </Typography>
                                    <AvatarGroup max={4}>
                                        {
                                            question.optionOne.votes.map(user => (
                                                <Tooltip key={users[user].id} title={users[user].name} aria-label={users[user].id}>
                                                    <Avatar alt={users[user].name} src={users[user].avatarURL} />
                                                </Tooltip>
                                            ))
                                        }

                                    </AvatarGroup>
                                </Box>
                                <Box display="flex" alignItems="center" marginTop="15px">
                                    <Box width="100%" mr={1}>
                                    <Typography component="h5" variant="h5">
                                        {question.optionTwo.votes.includes(authedUser) ? (<CheckCircleIcon htmlColor="#4caf50"/>) :''}
                                        {question.optionTwo.text} 
                                        </Typography>
                                        <BorderLinearProgress variant="determinate" value={opTwo} />
                                    </Box>
                                    <Box minWidth={35}>
                                        <Typography variant="body2" color="textSecondary">{`${Math.round(
                                            opTwo,
                                        )}%`}</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" >
                                    <Typography variant="body2" color="textSecondary" >
                                        votes :
                                    </Typography>
                                    <AvatarGroup max={4}>
                                        {
                                            question.optionTwo.votes.map(user => (
                                                <Tooltip key={users[user].id} title={users[user].name} aria-label={users[user].id}>
                                                    <Avatar alt={users[user].name} src={users[user].avatarURL} />
                                                </Tooltip>
                                            ))
                                        }

                                    </AvatarGroup>
                                </Box>
                            </CardContent>
                            <div className={classes.controls}>
                            <Link to="/">
                                <Button   variant="contained"   color="primary">
                                    Back
                                </Button>
                                </Link>
                            </div>
                        </div>
                        <CardMedia
                            children={
                                <CardHeader
                                    title={author.name}
                                    className={classes.title}
                                />}
                            className={classes.cover}
                            image={`/static/images/users/${question.author}.jpg`}
                            title="Live from space album cover"
                        />
                    </Card>
                </Paper>
            </Grid>
        )
    }
}

function mapStateToProps(
    { users, questions, authedUser },
    { match, qId }
) {
    let question, author, notFound = false;
    if (qId !== undefined) {
        question = questions[qId];
        author = users[question.author];
    } else {

        question = questions[match.params.id];
        const user = users[authedUser];

        if (question === undefined) {
            notFound = true;
        } else {
            author = users[question.author];
            if (Object.keys(user.answers).includes(question.optionOne.votes.lean)) {
            }
        }
    }

    return {
        notFound,
        question,
        author,
        users,
        authedUser
    };
}
export default connect(mapStateToProps)(Questions)


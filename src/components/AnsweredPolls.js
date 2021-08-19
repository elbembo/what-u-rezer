import React from 'react'
import { connect } from 'react-redux';
import {Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardHeader,CardContent,CardMedia,Grid,Typography,LinearProgress,Box,Button,Paper} from '@material-ui/core';

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
    
    title:{
        backgroundColor:'#00000094'

    }
}));

function AnsweredPolls(props) {



    const classes = useStyles();
    const { question ,users} = props;
    const opOne = Math.round((question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)
    const opTwo = Math.round((question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)
    return (
        <Grid>
            <Paper>
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                Would You Rather...?
                            </Typography>

                            <Box display="flex" alignItems="center">
                                <Box width="100%" mr={1}>
                                    {question.optionOne.text}
                                    <LinearProgress variant="determinate" value={opOne} />
                                </Box>
                                <Box minWidth={35}>
                                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                                        opOne,
                                    )}%`}</Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" marginTop="15px">
                                <Box width="100%" mr={1}>
                                    {question.optionTwo.text}
                                    <LinearProgress variant="determinate" value={opTwo} />
                                </Box>
                                <Box minWidth={35}>
                                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                                        opTwo,
                                    )}%`}</Typography>
                                </Box>
                            </Box>

                        </CardContent>
                        <div className={classes.controls}>
                        <Link to={`/questions/${question.id}`}>
                            <Button variant="contained" color="primary">
                                View details
                            </Button>
                            </Link>
                        </div>
                    </div>
                    <CardMedia
                    children={
                        <CardHeader
                        title={users[question.author].name}
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
function mapStateToProps(
    { users, questions, authedUser },
    { match, qId }
) {
    let question,
        author,
        badPath = false;
    if (qId !== undefined) {
        question = questions[qId];
        author = users[question.author];
    } else {
        const { qId } = match.params;
        question = questions[qId];

        if (question === undefined) {
            badPath = true;
        } else {
            author = users[question.author];

        }
    }

    return {
        badPath,
        question,
        author,
        users,
        authedUser
        
    };
}
export default connect(mapStateToProps)(AnsweredPolls)

import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent,CardHeader , CardMedia, Grid, Paper,Radio, RadioGroup, FormControlLabel, FormControl, Typography } from '@material-ui/core';

import { handleSaveQuestionAnswer } from '../actions/users';
import Button from '@material-ui/core/Button';
import { Render } from 'react-dom';
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

function UnansweredPolls(props) {
    const [value, setValue] = React.useState('optionOne');
    const [viewPoll, setviewPoll] = React.useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleSubmit = e => {
        e.preventDefault();
        if (value !== '') {
            const { authedUser, question, handleSaveQuestionAnswer } = props;
            handleSaveQuestionAnswer(authedUser, question.id, value);
            setviewPoll(true)
        }
    };
    const classes = useStyles();
    const { question,users } = props;
    if (viewPoll === true) {
        return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
        <Grid>
            <Paper>
            <Card className={classes.root}>

                <div className={classes.details}>
                
                    <form onSubmit={handleSubmit}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                Would You Rather...?
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} onChange={handleChange} />
                                    <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} onChange={handleChange} />
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <div className={classes.controls}>
                            <Button type="submit" variant="contained" color="primary">
                                Vote
                            </Button>
                        </div>
                    </form>
                </div>
                <CardMedia     
                children={
                <CardHeader
                title={users[question.author].name}
                className={classes.title}
                />}
                    className={classes.cover}
                    image={`/static/images/users/${question.author}.jpg`}
                    title="Live fro
                    m space album cover"
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
        authedUser,
        users
    };
}
export default connect(mapStateToProps, { handleSaveQuestionAnswer })(UnansweredPolls)
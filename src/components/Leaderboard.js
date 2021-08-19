import React from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Container, Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        flexGrow: 1,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    span: {
        paddingRight: '10px',
        color: "#ff9800"
    }
}));
function rankWithLetter(rank) {
    let num ='';
    switch(rank) {
        case 0:
          num = '1st place'
          break;
        case 1:
            num = '2nd place'
          break;
        default:
            num = '3rd place'
      }
      return num
}
function Leaderboard(props) {
    const { userRank } = props;
    const classes = useStyles();
    return (
        <Container>
            <Grid container className={classes.root} spacing={2}>
                {userRank.map((user, idx) => (
                    <Grid key={user.id} item>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={<Avatar alt={user.name} src={`/static/images/military-rank${idx + 1}.png`} />}
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={user.name}
                                subheader={rankWithLetter(idx)}
                            />
                            <CardMedia
                                className={classes.media}
                                image={user.avatarURL}
                                title="Paella dish"
                            />
                            <CardContent>

                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Typography variant="h5" color="textSecondary" component="span" className={classes.span}>
                                        {idx + 1}
                                    </Typography>
                                    {`Here is come ${user.name} in the ${rankWithLetter(idx)} with ${user.answerCount} answers, ${user.questionCount} questions and ${user.total} point as a total .`}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>))
                }
            </Grid>
        </Container>

    );
}

function mapStateToProps({ users }) {
    const userRank = Object.values(users).map(user => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length
    })).sort((a, b) => a.total - b.total).reverse().slice(0, 3);
    return { userRank };
}
export default connect(mapStateToProps)(Leaderboard);

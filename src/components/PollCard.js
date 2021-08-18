import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        width: 151,
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
}));

function PollCard() {
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Would You Rather...?
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <Button variant="contained" color="primary">
                            Primary
                        </Button>
                    </div>
                </div>
                <CardMedia
                    className={classes.cover}
                    image="/static/images/live-from-space.jpg"
                    title="Live from space album cover"
                />
            </Card>
        </>
    )
}

export default PollCard

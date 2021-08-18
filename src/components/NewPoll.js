import React, { useState } from 'react'
import clsx from 'clsx';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import { handleSaveQuestion } from '../actions/questions';
import { CircularProgress, Snackbar, Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function NewPoll(props) {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { authedUser, handleSaveQuestion } = props;
    const [option, setOption] = useState({ option1: '', option2: '' });
    const [open, setOpen] = useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });


    const onChange = (e) => {
        setOption({ ...option, [e.target.name]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        
        if (option.option1 !== '' || option.option2 !== '') {
            setSuccess(false);
        setLoading(true);
            new Promise((res, rej) => {
                handleSaveQuestion(option.option1, option.option2, authedUser);
                setTimeout(() => res('success'), 1000);
            }).then(() => {
                setOption({ option1: '', option2: '' })
                setSuccess(true);
                setLoading(false);
                setOpen(true);
                setTimeout(() =>setOpen(false), 3000);
            });
        } else {
            alert('Please fill all empty filds')
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Would You Rather...?
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField variant="outlined" margin="normal"  value={option.option1} required fullWidth label="Option 1"
                        name="option1" autoFocus onChange={onChange} />
                    <TextField variant="outlined" margin="normal" value={option.option2} required fullWidth name="option2" label="Option 2"
                        type="text" onChange={onChange} />

                    <div className={classes.wrapper}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={buttonClassname}
                            disabled={loading}
                        >
                            Publish{loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>
                        
                    </div>

                </form>
                <Snackbar open={open} autoHideDuration={6000} >
                    <Alert severity="success">
                    You poll published successfully !
                    </Alert>
                </Snackbar>
            </div>

        </Container>
    );
}
function mapStateToProps({ authedUser }) {
    return {
        authedUser
    };
}
export default connect(mapStateToProps, { handleSaveQuestion })(NewPoll);

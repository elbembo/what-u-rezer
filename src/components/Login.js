import React, { Component} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setAuthedUser } from '../actions/authedUser';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
export class Login extends Component {
    state = {
        loading: false
    };
    handleLoading = () => {
        this.setState({ loading: true });
    };

    render() {
        return (
            <>

                <ConnectedLoginForm onLoading={this.handleLoading} />
            </>
        );
    }
}


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
    formControl:{
        margin: theme.spacing(1),
    minWidth: '100%',
    }
}));


function LoginForm(props) {

    const [value, setValue] = React.useState('')

    const onChange = (e) => {

        setValue(e.target.value);
    };
    const handleSubmit = e => {
        e.preventDefault();
        if (value === '') {
            alert('Please select a user')
        } else {
            const { setAuthedUser } = props;
            const authedUser = value;

            new Promise((res, rej) => {

                setTimeout(() => res(), 500);
            }).then(() => setAuthedUser(authedUser));
        }
    };


    const classes = useStyles();
    const { users } = props;



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>

                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">User</InputLabel>
                        <Select 
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={value}
                            onChange={onChange}
                            label="User"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                users.map(user => (
                                    <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>

                                ))
                            }

                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit} value={value}
                    >
                        Sign In
                    </Button>

                </form>
            </div>
            <Box mt={8}>
            </Box>
        </Container>

    );

}

const ConnectedLoginForm = connect(
    mapStateToProps,
    { setAuthedUser }
)(LoginForm);

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    };
}

export default Login;

import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Homepage from './Homepage'
import Login from './Login';
import NavBar from './NavBar';
import NewPoll from './NewPoll';
import Questions from './Questions';
import Leaderboard from './Leaderboard';
function App(props) {


  useEffect(() => {
    props.dispatch(handleInitialData())
  });

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );



  const { authedUser } = props;
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {(authedUser === null) ? (
          <Login />
        ) : (
          <Router>
            <NavBar />
            <Route exact path="/" component={Homepage} />
            <Route path="/add" component={NewPoll} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/questions/:id" component={Questions} />
          </Router>
        )}
      </ThemeProvider>
    </>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(App);

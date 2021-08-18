import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


import UnansweredPolls from './UnansweredPolls';
import AnsweredPolls from './AnsweredPolls';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Homepage(props) {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { userQuestionData } = props;

    return (
        <div className={classes.root}>
            
            <Container maxWidth="sm">
                <Grid >

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Unanswered" {...a11yProps(0)} />
                                <Tab label="Answered" {...a11yProps(1)} />
                            </Tabs>
                            
                            <TabPanel value={value} index={0}>
                                {userQuestionData.unanswered.map(question => (
                                    <UnansweredPolls key={question.id} qId={question.id} question={question}  />
                                ))}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {userQuestionData.answered.map(question => (
                                    <AnsweredPolls key={question.id} qId={question.id} question={question} />
                                ))}
                            </TabPanel>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
function mapStateToProps({ authedUser, users, questions }) {
    const answeredIds = Object.keys(users[authedUser].answers);
    const answered = Object.values(questions)
        .filter(question => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
        .filter(question => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);

    return {
        userQuestionData: {
            answered,
            unanswered
        }
    };
}
export default connect(mapStateToProps)(Homepage)
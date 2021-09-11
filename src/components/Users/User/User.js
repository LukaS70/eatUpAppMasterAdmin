import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        flexBasis: '33.33%',
        flexShrink: 0,
        marginLeft: '15%',
        alignSelf: 'center'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(17),
        color: theme.palette.text.secondary,
        alignSelf: 'center',
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    tableHead: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: 'bold'
    },
}));

export default function User(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    {/* <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item sm={3}> */}
                    <Avatar aria-label="recipe" style={{ backgroundColor: getRandomColor() }} className={classes.large}>
                        {props.firstName.charAt(0)}
                    </Avatar>
                    {/* </Grid>
                        <Grid item sm={4}> */}
                    <Typography className={classes.heading}>{props.firstName + ' ' + props.lastName}</Typography>
                    {/* </Grid>
                        <Grid item sm={4}> */}
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    {/* <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHead}>Nutrition value</TableCell>
                                            <TableCell className={classes.tableHead} align="right">(per {props.measurementUnit})</TableCell>
                                        </TableRow>
                                    </TableHead> */}
                                    <TableBody>
                                    <TableRow>
                                            <TableCell component="th" scope="row">
                                                E-Mail
                                        </TableCell>
                                            <TableCell align="right">{props.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                First Name
                                        </TableCell>
                                            <TableCell align="right">{props.firstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                            Last Name
                                        </TableCell>
                                            <TableCell align="right">{props.lastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Gender
                                        </TableCell>
                                            <TableCell align="right">{props.gender}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Date of Birth
                                        </TableCell>
                                            <TableCell align="right">{props.dateOfBirth.split("T")[0]}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Height
                                        </TableCell>
                                            <TableCell align="right">{props.height} cm</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Weight
                                        </TableCell>
                                            <TableCell align="right">{props.height} kg</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Max Calories
                                        </TableCell>
                                            <TableCell align="right">{props.maxCalories} kcal</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} md={7}>
                    </Grid>
                    </Grid>
                    
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
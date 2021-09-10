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
import { Button } from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';

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

export default function Ingredient(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                    <Avatar alt="Remy Sharp" src={props.image} className={classes.large} />
                    {/* </Grid>
                        <Grid item sm={4}> */}
                    <Typography className={classes.heading}>{props.name}</Typography>
                    {/* </Grid>
                        <Grid item sm={4}> */}
                    <Typography className={classes.secondaryHeading} style={{marginLeft:'auto'}}>{props.calories} kcal</Typography>
                    {/*  </Grid>
                    </Grid> */}
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
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHead}>Nutrition value</TableCell>
                                            <TableCell className={classes.tableHead} align="right">(per {props.measurementUnit})</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Calories
                                        </TableCell>
                                            <TableCell align="right">{props.calories} kcal</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Total Fats
                                        </TableCell>
                                            <TableCell align="right">{props.totalFats} g</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Saturated Fats
                                        </TableCell>
                                            <TableCell align="right">{props.saturatedFats} g</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Total Carbohydrates
                                        </TableCell>
                                            <TableCell align="right">{props.totalCarbohydrates} g</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Sugars
                                        </TableCell>
                                            <TableCell align="right">{props.sugar} g</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Proteine
                                        </TableCell>
                                            <TableCell align="right">{props.proteine} g</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} md={7}>
                    <Button
                      style={{ width: "100%", marginTop:'10px' }}
                      variant="contained"
                      color="primary"
                      onClick={props.unpublic}
                      startIcon={<PublicIcon />}
                    >
                      REMOVE PUBLIC STATUS
                    </Button>
                    </Grid>
                    </Grid>
                    
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
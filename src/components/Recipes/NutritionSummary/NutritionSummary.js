import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    tableHead: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: 'bold'
    },
}));


export default function NutritionSummary(props) {
    const classes = useStyles();

    return (
        <div style={{ padding: '15px' }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead}>Recipe Nutrition Summary</TableCell>
                            <TableCell className={classes.tableHead} align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Calories
                            </TableCell>
                            <TableCell align="right">{props.calories >= 0.01 ? props.calories : 0} kcal</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Total Fats
                            </TableCell>
                            <TableCell align="right">{props.totalFats >= 0.01 ? props.totalFats : 0} g</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Saturated Fats
                            </TableCell>
                            <TableCell align="right">{props.saturatedFats >= 0.01 ? props.saturatedFats : 0} g</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Total Carbohydrates
                            </TableCell>
                            <TableCell align="right">{props.totalCarbohydrates >= 0.01 ? props.totalCarbohydrates : 0} g</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Sugars
                            </TableCell>
                            <TableCell align="right">{props.sugar >= 0.01 ? props.sugar : 0} g</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Proteine
                            </TableCell>
                            <TableCell align="right">{props.proteine >= 0.01 ? props.proteine : 0} g</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
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


export default function RecipesSummary(props) {
    const classes = useStyles();

    return (
        <div style={{ padding: '5px' }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead}>Recipes Summary</TableCell>
                            <TableCell className={classes.tableHead} align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Count
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">{props.count} recipes</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Most Ingredients
                            </TableCell>
                            
                            <TableCell align="right" component="th" scope="row">{props.mostIngs.name + ' (' + props.mostIngs.ingredients.length +' ingredients)'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Least Ingredients
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">{props.leastIngs.name + ' (' + props.leastIngs.ingredients.length +' ingredients)'}</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                    <Table>
                    <TableBody>
                        <TableRow >
                            <TableCell style={{fontWeight: 'bold'}} component="th" scope="row"></TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center" component="th" scope="row">Max</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center" component="th" scope="row">Min</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center" component="th" scope="row">Avg</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}} component="th" scope="row">
                                Calories
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">{props.maxCal.name + ' ('+props.maxCal.nutrition.calories} kcal)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.minCal.name + ' ('+props.minCal.nutrition.calories} kcal)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.avgCal} kcal</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell  style={{fontWeight: 'bold'}} component="th" scope="row">
                                Total Fats
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">{props.maxTF.name + ' ('+props.maxTF.nutrition.totalFats} g)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.minTF.name + ' ('+props.minTF.nutrition.totalFats} g)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.avgTF} g</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}} component="th" scope="row">
                                Saturated Fats
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">{props.maxSF.name + ' ('+props.maxSF.nutrition.saturatedFats} g)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.minSF.name + ' ('+props.minSF.nutrition.saturatedFats} g)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.avgSF} g</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}} component="th" scope="row">
                                 Total Carbohydrates
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">{props.maxTC.name + ' ('+props.maxTC.nutrition.totalCarbohydrates} g)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.minTC.name + ' ('+props.minTC.nutrition.totalCarbohydrates} g)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.avgTC} g</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}} component="th" scope="row">
                                Sugars
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">{props.maxS.name + ' ('+props.maxS.nutrition.sugar} g)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.minS.name + ' ('+props.minS.nutrition.sugar} g)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.avgS} g</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}} component="th" scope="row">
                                Proteine
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">{props.maxP.name + ' ('+props.maxP.nutrition.proteine} g)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.minP.name + ' ('+props.minP.nutrition.proteine} g)</TableCell>
                            <TableCell component="th" scope="row" align="center">{props.avgP} g</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
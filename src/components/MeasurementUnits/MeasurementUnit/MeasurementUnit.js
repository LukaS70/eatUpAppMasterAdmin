import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: "bold",
  },
}));

export default function MeasurementUnit(props) {
  const classes = useStyles();

  return (
    <div style={{ padding: "15px" }}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>Name</TableCell>
                  <TableCell className={classes.tableHead} align="right">
                    {props.name}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    DisplayName
                  </TableCell>
                  <TableCell align="right">{props.displayName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    PerName
                  </TableCell>
                  <TableCell align="right">{props.perName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Button
                      style={{ width: "100%" }}
                      variant="contained"
                      color="primary"
                      onClick={props.edit}
                      startIcon={<EditOutlinedIcon />}
                    >
                      EDIT UNIT
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      style={{ width: "100%" }}
                      variant="contained"
                      color="secondary"
                      onClick={props.delete}
                      startIcon={<DeleteOutlinedIcon />}
                    >
                      DELETE UNIT
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={10} sm={7} md={6} lg={4}>
          <br />
        </Grid>
        <Grid item xs={10} sm={7} md={6} lg={4}>
          <br />
        </Grid>
      </Grid>
    </div>
  );
}

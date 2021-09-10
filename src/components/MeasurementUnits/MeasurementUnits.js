import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MeasurementUnit from "./MeasurementUnit/MeasurementUnit";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  measurementUnit: {
    padding: theme.spacing(0.5),
    textAlign: "",
    color: theme.palette.text.secondary,
    /* minWidth: '550px' */
  },
}));

const MeasurementUnits = (props) => {
  const classes = useStyles();

  const measurementUnits = props.measurementUnits.map((mu) => {
    return (
      <Grid item sm={12} xl={12} key={mu.id} className={classes.measurementUnit}>
        <MeasurementUnit
          name={mu.name}
          displayName={mu.displayName}
          perName={mu.perName}
          edit={() => props.edit(mu.id)}
          delete={() => props.delete(mu.id)}
        />
      </Grid>
    );
  });

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item sm={6} xl={6} className={classes.measurementUnit}>
          <Typography variant="h5" align="center">
            MeasurementUnits
          </Typography>
          
        </Grid>
        <Grid item sm={6} xl={6} className={classes.measurementUnit}>
          
          <Button
            style={{ width: "80%" , marginLeft:'40px'}}
            variant="contained"
            color="secondary"
            onClick={props.add}
            startIcon={<AddIcon />}
          >
            ADD UNIT
          </Button>
        </Grid>
        {measurementUnits}
      </Grid>
    </div>
  );
};

export default MeasurementUnits;
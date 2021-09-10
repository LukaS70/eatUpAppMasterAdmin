import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import IngredientCategory from "./IngredientCategory/IngredientCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  ingredient: {
    padding: theme.spacing(0.5),
    textAlign: "",
    color: theme.palette.text.secondary,
    /* minWidth: '550px' */
  },
}));

const IngredientCagories = (props) => {
  const classes = useStyles();

  const ingredientCategories = props.ingredientCategories.map((ic) => {
    return (
      <Grid item sm={12} xl={12} key={ic.id} className={classes.ingredient}>
        <IngredientCategory
          name={ic.name}
          displayName={ic.displayName}
          edit={() => props.edit(ic.id)}
          delete={() => props.delete(ic.id)}
        />
      </Grid>
    );
  });

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item sm={6} xl={6} className={classes.ingredient}>
          <Typography variant="h5" align="center">
            Ingredient Categories
          </Typography>
          
        </Grid>
        <Grid item sm={6} xl={6} className={classes.ingredient}>
          
          <Button
            style={{ width: "80%" , marginLeft:'40px'}}
            variant="contained"
            color="secondary"
            onClick={props.add}
            startIcon={<AddIcon />}
          >
            ADD CATEGORY
          </Button>
        </Grid>
        {ingredientCategories}
      </Grid>
    </div>
  );
};

export default IngredientCagories;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RecipeCategory from "./RecipeCategory/RecipeCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  recipe: {
    padding: theme.spacing(0.5),
    textAlign: "",
    color: theme.palette.text.secondary,
    /* minWidth: '550px' */
  },
}));

const RecipeCagories = (props) => {
  const classes = useStyles();

  const recipeCategories = props.recipeCategories.map((rc) => {
    return (
      <Grid item sm={12} xl={12} key={rc.id} className={classes.recipe}>
        <RecipeCategory
          name={rc.name}
          displayName={rc.displayName}
          edit={() => props.edit(rc.id)}
          delete={() => props.delete(rc.id)}
        />
      </Grid>
    );
  });

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item sm={6} xl={6} className={classes.recipe}>
          <Typography variant="h5" align="center">
            Recipe Categories
          </Typography>
          
        </Grid>
        <Grid item sm={6} xl={6} className={classes.recipe}>
          
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
        {recipeCategories}
      </Grid>
    </div>
  );
};

export default RecipeCagories;

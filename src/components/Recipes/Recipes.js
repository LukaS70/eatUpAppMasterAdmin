import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Recipe from './Recipe/Recipe';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    recipe: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fab2: {
        position: 'fixed',
        bottom: theme.spacing(2),
        left: theme.spacing(2),
    },
}));

const Recipes = (props) => {
    const classes = useStyles();
    const recipes = props.recipes.map(recipe => (
        <Grid item sm={12} md={6} lg={6} xl={6} key={recipe.id}>
            <Recipe
                className={classes.recipe}
                name={recipe.name}
                instructions={recipe.instructions}
                image={recipe.image}
                toDetails={() => props.openDetails(recipe.id)}
            />
        </Grid>
    ))

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {recipes}
            </Grid>
        </div>
    );
}

export default Recipes;
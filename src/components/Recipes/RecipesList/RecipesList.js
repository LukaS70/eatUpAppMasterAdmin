import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RecipesListItem from './RecipesListItem/RecipesListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
    recipe: {
        padding: theme.spacing(1),
        textAlign: '',
        color: theme.palette.text.secondary,
        /* minWidth: '550px' */
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const RecipesList = (props) => {
    const classes = useStyles();

    const recipes = props.recipes.map(recipe => {
        return (
            <Grid item sm={12} xl={12} key={recipe.id} className={classes.recipe}>
                <RecipesListItem
                    ingredients={recipe.ingredients}
                    calories={recipe.nutrition.calories}
                    image={recipe.image}
                    name={recipe.name}
                    instructions={recipe.instructions}
                    totalFats={recipe.nutrition.totalFats}
                    saturatedFats={recipe.nutrition.saturatedFats}
                    totalCarbohydrates={recipe.nutrition.totalCarbohydrates}
                    sugar={recipe.nutrition.sugar}
                    proteine={recipe.nutrition.proteine}
                    category={recipe.category.displayName}
                    measurementUnits={props.measurementUnits}
                    firstName={props.users.find(user => { return user.id === recipe.creator }).firstName}
                    lastName={props.users.find(user => { return user.id === recipe.creator }).lastName}
                    email={props.users.find(user => { return user.id === recipe.creator }).email}
                    public={() => props.makePublic(recipe.id)}
                    deny={() => props.denyPublic(recipe.id)}
                />
            </Grid>
        )
    })

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {recipes}
            </Grid>
        </div>
    );
}

export default RecipesList;
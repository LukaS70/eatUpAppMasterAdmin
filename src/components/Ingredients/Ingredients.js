import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Ingredient from './Ingredient/Ingredient';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
    ingredient: {
        padding: theme.spacing(0.5),
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

const Ingredients = (props) => {
    const classes = useStyles();

    const ingredients = props.ingredients.map(ingredient => {
        return (
            <Grid item sm={12} xl={12} key={ingredient.id} className={classes.ingredient}>
                <Ingredient
                    calories={ingredient.nutrition.calories}
                    image={ingredient.image}
                    name={ingredient.name}
                    totalFats={ingredient.nutrition.totalFats}
                    saturatedFats={ingredient.nutrition.saturatedFats}
                    totalCarbohydrates={ingredient.nutrition.totalCarbohydrates}
                    sugar={ingredient.nutrition.sugar}
                    proteine={ingredient.nutrition.proteine}
                    category={ingredient.category.displayName}
                    measurementUnit={ingredient.measurementUnit.perName}
                    unpublic={() => props.unmakePublic(ingredient.id)}
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
                {ingredients}
            </Grid>
        </div>
    );
}

export default Ingredients;
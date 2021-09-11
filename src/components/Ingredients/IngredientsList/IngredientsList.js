import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IngredientListItem from './IngredientsListItem/IngredientsListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
    ingredient: {
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

const IngredientsList = (props) => {
    const classes = useStyles();

    const ingredients = props.ingredients.map(ingredient => {
        return (
            <Grid item sm={12} xl={12} key={ingredient.id} className={classes.ingredient}>
                <IngredientListItem
                    calories={ingredient.nutrition.calories}
                    image={ingredient.image}
                    name={ingredient.name}
                    totalFats={ingredient.nutrition.totalFats}
                    saturatedFats={ingredient.nutrition.saturatedFats}
                    totalCarbohydrates={ingredient.nutrition.totalCarbohydrates}
                    sugar={ingredient.nutrition.sugar}
                    proteine={ingredient.nutrition.proteine}
                    category={ingredient.category.displayName}
                    measurementUnit={ingredient.measurementUnit.name}
                    firstName={props.users.find(user => { return user.id === ingredient.creator }).firstName}
                    lastName={props.users.find(user => { return user.id === ingredient.creator }).lastName}
                    email={props.users.find(user => { return user.id === ingredient.creator }).email}
                    public={() => props.makePublic(ingredient.id)}
                    deny={() => props.denyPublic(ingredient.id)}
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

export default IngredientsList;
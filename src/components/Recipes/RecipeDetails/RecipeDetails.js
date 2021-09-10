import { Avatar, Divider, Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import NutritionSummary from '../NutritionSummary/NutritionSummary'

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 'center'
    },
    image: {
        width: '100%',
        height: 'auto',

    },
    imagePaper: {
        overflow: 'auto',
        maxHeight: '385px'
    },
    instructions: {
        padding: '5%'
    },
    name: {
        marginBottom: '3%',
        padding: '3%',
    },
    ingredients: {
        marginTop: '2%'
    },
    nutrition: {
        marginBottom: '50px'
    }
}));

function RecipeDetails(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={2}>

                <Grid item xs={12} md={6} >
                    <Paper variant="outlined" elevation={8} className={classes.imagePaper} >
                        <img src={props.recipe.image} alt={props.recipe.name} className={classes.image} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={5}>
                        <Typography variant="h4" className={classes.name} align='center' style={{maxHeight:'85px', overflow: 'auto'}} >
                            {props.recipe.name}
                        </Typography>
                    </Paper>
                    <Paper elevation={5} className={classes.instructions} style={{maxHeight:'220px', overflow: 'auto'}}>
                        <Typography variant="h5" style={{ marginBottom: '5%' }}>
                            Instructions:
                        </Typography>
                        <Typography>
                            {props.recipe.instructions}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={5} className={classes.ingredients} style={{maxHeight:'375px', overflow: 'auto'}}>
                        <Typography variant="h5" style={{ padding: '5%' }}>
                            Ingredients:
                        </Typography>
                        <List>
                            {props.recipe.ingredients.map(ingredient => (
                                <div key={ingredient.ingredient.id}>
                                    <Divider />
                                    <ListItem style={{ minWidth: '300px' }}>
                                        <ListItemAvatar>
                                            <Avatar src={ingredient.ingredient.image} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={ingredient.ingredient.name}
                                        />
                                        <ListItemSecondaryAction>
                                            <ListItemText
                                                primary={ingredient.amount + props.measurementUnits.find(unit => {
                                                    return unit.id === ingredient.ingredient.measurementUnit;
                                                }).displayName}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </div>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} className={classes.nutrition} >
                    <NutritionSummary 
                        calories={props.recipe.nutrition.calories}
                        totalFats={props.recipe.nutrition.totalFats}
                        saturatedFats={props.recipe.nutrition.saturatedFats}
                        totalCarbohydrates={props.recipe.nutrition.totalCarbohydrates}
                        sugar={props.recipe.nutrition.sugar}
                        proteine={props.recipe.nutrition.proteine}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default RecipeDetails

import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

export class AnalyticsPage extends Component {
    state = {
        
    }

    componentDidMount() {
        this.props.onFetchRecipeCategories(this.props.token);
    }


    render() {

        if(!this.props.loadingRecipeCategories) {
            console.log(this.props.recipeCategories);
        }
        return (
            
            <div>
                <p>data management</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        loadingUsers: state.users.loading,
        ingredients: state.ingredients.ingredients,
        loadingIngredients: state.ingredients.loading,
        ingredientCategories: state.ingredientCategories.ingredientCategories,
        loadingIngredientCategories: state.ingredientCategories.loading,
        recipeCategories: state.recipeCategories.recipeCategories,
        loadingRecipeCategories: state.recipeCategories.loading,
        measurementUnits: state.measurementUnits.measurementUnits,
        loadingMeasurementUnits: state.measurementUnits.loading,
        dailyNutrition: state.dailyNutrition.dailyNutrition,
        loadingDailyNutrition: state.dailyNutrition.loading,
        shoppingLists: state.shoppingLists.shoppingLists,
        loadingShoppingLists: state.shoppingLists.loading,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: (token) => dispatch(actions.fetchUsers(token)),
        onFetchDailyNutrition: (token) => dispatch(actions.fetchDailyNutrition(token)),
        onFetchIngredients: (token) => dispatch(actions.fetchIngredients(token)),
        onFetchIngredientCategories: (token) => dispatch(actions.fetchIngredientCategories(token)),
        onFetchRecipeCategories: (token) => dispatch(actions.fetchRecipeCategories(token)),
        onFetchMesurementUnits: (token) => dispatch(actions.fetchMeasurementUnits(token)),
        onFetchShoppingLists: (token) => dispatch(actions.fetchShoppingLists(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
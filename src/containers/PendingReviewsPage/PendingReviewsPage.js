import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Grid, Snackbar } from '@material-ui/core';
import Dialog from '../../components/UI/Dialog/Dialog';
import IngredientsList from '../../components/Ingredients/IngredientsList/IngredientsList';
import RecipesList from '../../components/Recipes/RecipesList/RecipesList';

export class AnalyticsPage extends Component {
    state = {
        showPublicRecipeDialog: false,
        showPublicIngredientDialog: false,
        idForPublic: null,
        showDenyRecipeDialog: false,
        showDenyIngredientDialog: false,
        idForDeny: null
    }

    componentDidMount() {
        this.props.onFetchRecipes(this.props.token);
        this.props.onFetchIngredients(this.props.token);
        this.props.onFetchMesurementUnits(this.props.token);
        this.props.onFetchUsers(this.props.token);
    }

    makeRecipePublicHandler = () => {
        this.props.onMakeRecipePublic(this.state.idForPublic, this.props.token);
        setTimeout(() => {
            this.setState({ showPublicRecipeDialog: false, idForPublic: null });
            this.props.onFetchRecipes(this.props.token);
        },500);
    }

    makeRp = (recId) => {
        this.setState({ showPublicRecipeDialog: true, idForPublic: recId });
    }

    makeIngredientPublicHandler = () => {
        this.props.onMakeIngredientPublic(this.state.idForPublic, this.props.token);
        setTimeout(() => {
            this.setState({ showPublicIngredientDialog: false, idForPublic: null });
            this.props.onFetchIngredients(this.props.token);
        },500);
    }

    makeIp = (ingId) => {
        this.setState({ showPublicIngredientDialog: true, idForPublic: ingId });
    }

    denyRecipePublicHandler = () => {
        this.props.onUnmakeRecipePublic(this.state.idForDeny, this.props.token);
        setTimeout(() => {
            this.setState({ showDenyRecipeDialog: false, idForDeny: null });
            this.props.onFetchRecipes(this.props.token);
        },500);
    }

    denyRp = (recId) => {
        this.setState({ showDenyRecipeDialog: true, idForDeny: recId });
    }

    denyIngredientPublicHandler = () => {
        this.props.onUnmakeIngredientPublic(this.state.idForDeny, this.props.token);
        setTimeout(() => {
            this.setState({ showDenyIngredientDialog: false, idForDeny: null });
            this.props.onFetchIngredients(this.props.token);
        },500);
    }

    denyIp = (ingId) => {
        this.setState({ showDenyIngredientDialog: true, idForDeny: ingId });
    }

    render() {
        let data = (
            <Spinner show={this.props.loadingRecipes || this.props.loadingIngredients || this.props.loadingMeasurementUnits || this.props.loadingUsers} />
        );

        if(!this.props.loadingRecipes && !this.props.loadingIngredients && !this.props.loadingMeasurementUnits && !this.props.loadingUsers && this.props.users.length > 0) {
            data = (
                <div>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        spacing={3}>

                        <Grid item xs={12} md={6} style={{maxHeight:'860px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                            <IngredientsList
                                ingredients={this.props.ingredients.filter(ing => {
                                    return ing.reviewRequested === true;
                                })}
                                users = {this.props.users}
                                makePublic={(ingId) => this.makeIp(ingId)}
                                denyPublic={(ingId) => this.denyIp(ingId)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} style={{maxHeight:'860px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                            <RecipesList
                                recipes={this.props.recipes.filter(rec => {
                                    return rec.reviewRequested === true;
                                })}
                                measurementUnits = {this.props.measurementUnits}
                                users = {this.props.users}
                                makePublic={(ingId) => this.makeRp(ingId)}
                                denyPublic={(ingId) => this.denyRp(ingId)}
                            />
                        </Grid>
                    </Grid>

                    <Dialog
                        show={this.state.showPublicRecipeDialog}
                        title={'Make this recipe public?'}
                        content={'This recipe will be visible to everyone.'}
                        onCancel={() => { this.setState({ showPublicRecipeDialog: false, idForPublic: null  }) }}
                        onOk={this.makeRecipePublicHandler} />
                    <Dialog
                        show={this.state.showPublicIngredientDialog}
                        title={'Make this ingredient public?'}
                        content={'This ingredient will be visible to everyone.'}
                        onCancel={() => { this.setState({ showPublicIngredientDialog: false, idForPublic: null  }) }}
                        onOk={this.makeIngredientPublicHandler} />
                    <Dialog
                        show={this.state.showDenyRecipeDialog}
                        title={'Deny public status from this recipe?'}
                        content={'User will be able to request a review again.'}
                        onCancel={() => { this.setState({ showDenyRecipeDialog: false, idForDeny: null  }) }}
                        onOk={this.denyRecipePublicHandler} />
                    <Dialog
                        show={this.state.showDenyIngredientDialog}
                        title={'Deny public status from this ingredient?'}
                        content={'User will be able to request a review again.'}
                        onCancel={() => { this.setState({ showDenyIngredientDialog: false, idForDeny: null  }) }}
                        onOk={this.denyIngredientPublicHandler} />
                </div>
            );
        }

        let message = null;
        if (this.state.showSnackbar) {
            message = (<Snackbar message={this.state.message} severity={this.state.severity}></Snackbar>);
        }

        return (
            <div>
                {data}
                {message}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes.recipes,
        loadingRecipes: state.recipes.loading,
        ingredients: state.ingredients.ingredients,
        loadingIngredients: state.ingredients.loading,
        measurementUnits: state.measurementUnits.measurementUnits,
        loadingMeasurementUnits: state.measurementUnits.loading,
        users: state.users.users,
        loadingUsers: state.users.loading,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchRecipes: (token) => dispatch(actions.fetchRecipes(token)),
        onFetchIngredients: (token) => dispatch(actions.fetchIngredients(token)),
        onFetchMesurementUnits: (token) => dispatch(actions.fetchMeasurementUnits(token)),
        onFetchUsers: (token) => dispatch(actions.fetchUsers(token)),
        onMakeRecipePublic: (recId, token) => dispatch(actions.makeRecipePublic(recId, token)),
        onUnmakeRecipePublic: (recId, token) => dispatch(actions.unmakeRecipePublic(recId, token)),
        onMakeIngredientPublic: (ingId, token) => dispatch(actions.makeIngredientPublic(ingId, token)),
        onUnmakeIngredientPublic: (ingId, token) => dispatch(actions.unmakeIngredientPublic(ingId, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { updateObject } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import LineChart from '../../components/UI/Chart/LineChart';
import BarChart from '../../components/UI/Chart/BarChart';
import { Divider, Grid } from '@material-ui/core';
import Users from '../../components/Users/Users';
import IngredientsSummary from '../../components/Ingredients/IngredientsSummary/IngredientsSummary';
import RecipesSummary from '../../components/Recipes/RecipesSummary/RecipesSummary';

export class AnalyticsPage extends Component {
    state = {
        selectNutritionChartData: {
            elementType: 'select',
            elementConfig: {
                label: 'Select Nutrition Type',
            },
            value: 'calories',
        },
        selectUserChartData: {
            elementType: 'select',
            elementConfig: {
                label: 'Select User',
            },
            value: '605f66b7ea73553908b6a3bc',
        },
        searchUsers: {
            elementType: 'search',
            elementConfig: {
                type: 'search',
                placeholder: 'Search Users',
            },
            value: ""
        },
        filteredUsers: []
    }

    componentDidMount() {
        this.props.onFetchRecipes(this.props.token);
        this.props.onFetchIngredients(this.props.token);
        this.props.onFetchUsers(this.props.token);
        this.props.onFetchShoppingLists(this.props.token);
        this.props.onFetchDailyNutrition(this.props.token);
    }

    selectNutritionChartDataChangedHandler = (event) => {
        const updatedSelect = updateObject(this.state.selectNutritionChartData, {
            value: event.target.value,
        });
        this.setState({ selectNutritionChartData: updatedSelect });
    }

    selectUserChartDataChangedHandler = (event) => {
        console.log(event);
        const updatedSelect = updateObject(this.state.selectUserChartData, {
            value: event.target.value,
        });
        this.setState({ selectUserChartData: updatedSelect }, ()=>{
            console.log(this.state.selectUserChartData);
        });
    }

    searchUsersHandler = (event) => {
        let value = event.target.value

        const updatedSearchValue = updateObject(this.state.searchUsers, {
            value: value
        });

        this.setState({ searchUsers: updatedSearchValue });
    }

    applySearch = () => {
        const usrs = this.props.users;
        let filteredUsers = [];

        // eslint-disable-next-line array-callback-return
        usrs.map(user => {
            /*  console.log(ing.calories); */
                if (this.state.searchUsers.value === "") {
                    filteredUsers.push(user);
                    console.log(user);
                } else if (user.firstName.toLowerCase().includes(this.state.searchUsers.value.toLowerCase()) || 
                            user.lastName.toLowerCase().includes(this.state.searchUsers.value.toLowerCase())) {
                    filteredUsers.push(user);
                    console.log(user);
                } 
            });
        /* if (filteredUsers.length === 0) {
            // neki dialog message da nema pronadjenih elemenata!!!!!!!!!
            this.setState({ showSnackbar: true, message: 'No such users found', severity: 'warning' }, () => {
                setTimeout(() => {
                    this.setState({ showSnackbar: false, message: null, severity: null })
                }, 3000);
            })
        } */
        if (filteredUsers.length === this.props.users.length) {
            filteredUsers = [];
        }

        this.setState({ filteredUsers: filteredUsers });
    }

    render() {
        let data = (
            <Spinner show={this.props.loadingRecipes || this.props.loadingIngredients || this.props.loadingUsers 
                || this.props.loadingShoppingLists || this.props.loadingDailyNutrition} />
        );


        let chartDailyNutrition = null;
        let chartUsers = null;
        let chartNutritionEntries = null;
        let inputUser = null;
        let inputNutrition = null;

        let mostUsedIng = null;
        let leastUsedIng = null;
        let maxCalIng= null;
        let minCalIng= null;
        let maxSFIng=null;
        let minSFIng=null;
        let maxTFIng=null;
        let minTFIng=null;
        let maxTCIng=null;
        let minTCIng=null;
        let maxSIng=null;
        let minSIng=null;
        let maxPIng=null;
        let minPIng=null;
        let sumCalIng=0;
        let sumSFIng=0;
        let sumTFIng=0;
        let sumTCIng=0;
        let sumSIng=0;
        let sumPIng=0;

        let mostIngsRec = null;
        let leastIngsRec = null;
        let maxCalRec= null;
        let minCalRec= null;
        let maxSFRec=null;
        let minSFRec=null;
        let maxTFRec=null;
        let minTFRec=null;
        let maxTCRec=null;
        let minTCRec=null;
        let maxSRec=null;
        let minSRec=null;
        let maxPRec=null;
        let minPRec=null;
        let sumCalRec=0;
        let sumSFRec=0;
        let sumTFRec=0;
        let sumTCRec=0;
        let sumSRec=0;
        let sumPRec=0;

        if(!this.props.loadingRecipes && !this.props.loadingIngredients && !this.props.loadingUsers 
            && !this.props.loadingShoppingLists && !this.props.loadingDailyNutrition && this.props.users.length > 0) {
    
            let chartDailyNutritionData = [];
            let chartDailyNutritionLabels = [];
            let chartDailyNutritionColors = {
                borderColor: '#000000',
                backgroundColor: '#cae5c4',
                hoverBackgroundColor: '#cfe8ca',
                hoverBorderColor: 'success',
                pointBackgroundColor: '#438a06',
                pointBorderColor: 'success',
                borderWidth: 1,
                lineTension: 0.3
            };
            
            let sumForAverage = 0;
            let avg = 0;
            const selectOptions = [
                { id: 'calories', displayName: 'Calories' },
                { id: 'totalFats', displayName: 'Total Fats' },
                { id: 'saturatedFats', displayName: 'Saturated Fats' },
                { id: 'totalCarbohydrates', displayName: 'Total Carbohydrates' },
                { id: 'sugar', displayName: 'Sugar' },
                { id: 'proteine', displayName: 'Proteine' }
            ];

            let dailyNut = this.props.dailyNutrition;
            let dailyCal=[]
            console.log(dailyNut);
            dailyNut.map(dn => {
                /*  console.log(ing.calories); */
                const dc = dailyCal.find(dc => { return dc.day === dn.day})
                    if (dc) {
                        dc.nutrition.calories += dn.nutrition.calories;
                        dc.nutrition.totalFats += dn.nutrition.totalFats;
                        dc.nutrition.saturatedFats += dn.nutrition.saturatedFats;
                        dc.nutrition.totalCarbohydrates += dn.nutrition.totalCarbohydrates;
                        dc.nutrition.sugar += dn.nutrition.sugar;
                        dc.nutrition.proteine += dn.nutrition.proteine;
                    } else  {
                        dailyCal.push(dn);
                    } 
                });

            for (let index = 0; index < dailyCal.length; index++) {
                const element = dailyCal[index];
                const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
                // eslint-disable-next-line no-unused-vars
                const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(new Date(element.day));
                chartDailyNutritionLabels.push(`${day}-${month}`);
                chartDailyNutritionData.push(element.nutrition[this.state.selectNutritionChartData.value]);
                sumForAverage += element.nutrition[this.state.selectNutritionChartData.value];
            }

            console.log(chartDailyNutritionData);
            avg = Math.round(((sumForAverage / dailyCal.length) + Number.EPSILON) * 100) / 100;


            inputNutrition = (
                <Input
                elementType={this.state.selectNutritionChartData.elementType}
                elementConfig={this.state.selectNutritionChartData.elementConfig}
                value={this.state.selectNutritionChartData.value}
                changed={(event) => this.selectNutritionChartDataChangedHandler(event)}
                options={selectOptions} />
            );

            chartDailyNutrition = (
                
                    <LineChart
                        data={chartDailyNutritionData}
                        labels={chartDailyNutritionLabels}
                        title={'Daily ' + selectOptions.find(o => { return o.id === this.state.selectNutritionChartData.value }).displayName + ' (Avg. ' + avg + ')'}
                        colors={chartDailyNutritionColors}
                    />
                
            );

            const sl = this.props.shoppingLists.find(sl => {return sl.creator === this.state.selectUserChartData.value});
            let itemsNumber = 0;
            if(sl){
                itemsNumber = sl.items.length;
            }
            let chartUsersData=[
                this.props.recipes.filter(rec => {return rec.creator === this.state.selectUserChartData.value}).length,
                this.props.ingredients.filter(rec => {return rec.creator === this.state.selectUserChartData.value}).length,
                itemsNumber,
                this.props.dailyNutrition.filter(rec => {return rec.creator === this.state.selectUserChartData.value}).length,
            ];
            
            let chartUsersLabels = ['Recipes', 'Ingredients', 'Shopping List Items', 'Daily Nutrition Entries'];
            let chartUsersOptions = [];
            for (let index = 0; index < this.props.users.length; index++) {
                chartUsersOptions.push({
                    id: this.props.users[index].id,
                    displayName: this.props.users[index].firstName + ' ' + this.props.users[index].lastName,
                });
            }
            
            inputUser=(
                <Input
                        elementType={this.state.selectUserChartData.elementType}
                        elementConfig={this.state.selectUserChartData.elementConfig}
                        value={this.state.selectUserChartData.value}
                        changed={(event) => this.selectUserChartDataChangedHandler(event)}
                        options={chartUsersOptions} />
            );
            chartUsers = (
                
                    
                    
                    <BarChart
                        data={chartUsersData}
                        labels={chartUsersLabels}
                        title={'User Information'}
                    />
               
            );


            let chartNutritionEntriesData=[];
            let chartNutritionEntriesLabels = [];

            for (let index = 0; index < this.props.users.length; index++) {
                chartNutritionEntriesData.push(this.props.users[index].dailyNutrition.length);
                chartNutritionEntriesLabels.push(this.props.users[index].firstName + ' ' + this.props.users[index].lastName);
            }
            
            chartNutritionEntries = (
                <div>
                    <BarChart
                        data={chartNutritionEntriesData}
                        labels={chartNutritionEntriesLabels}
                        title={'Number of Entries'}
                    />
                </div>
            );

        }

        
        for (let index = 0; index < this.props.ingredients.length; index++) {
            sumCalIng += this.props.ingredients[index].nutrition.calories;
            sumSFIng += this.props.ingredients[index].nutrition.saturatedFats;
            sumTFIng += this.props.ingredients[index].nutrition.totalFats;
            sumTCIng += this.props.ingredients[index].nutrition.totalCarbohydrates;
            sumSIng += this.props.ingredients[index].nutrition.sugar;
            sumPIng += this.props.ingredients[index].nutrition.proteine;

            if (!mostUsedIng || this.props.ingredients[index].recipes.length > mostUsedIng.recipes.length) {
                mostUsedIng = this.props.ingredients[index];
            }
            if (!leastUsedIng || this.props.ingredients[index].recipes.length < leastUsedIng.recipes.length) {
                leastUsedIng = this.props.ingredients[index];
            }
            if (!maxCalIng || this.props.ingredients[index].nutrition.calories > maxCalIng.nutrition.calories) {
                maxCalIng = this.props.ingredients[index];
            }
            if (!minCalIng || this.props.ingredients[index].nutrition.calories < minCalIng.nutrition.calories) {
                minCalIng = this.props.ingredients[index];
            }
            if (!maxSFIng || this.props.ingredients[index].nutrition.saturatedFats > maxSFIng.nutrition.saturatedFats) {
                maxSFIng = this.props.ingredients[index];
            }
            if (!minSFIng || this.props.ingredients[index].nutrition.saturatedFats < minSFIng.nutrition.saturatedFats) {
                minSFIng = this.props.ingredients[index];
            }
            if (!maxTFIng || this.props.ingredients[index].nutrition.totalFats > maxTFIng.nutrition.totalFats) {
                maxTFIng = this.props.ingredients[index];
            }
            if (!minTFIng || this.props.ingredients[index].nutrition.totalFats < minTFIng.nutrition.totalFats) {
                minTFIng = this.props.ingredients[index];
            }
            if (!maxTCIng || this.props.ingredients[index].nutrition.totalCarbohydrates > maxTCIng.nutrition.totalCarbohydrates) {
                maxTCIng = this.props.ingredients[index];
            }
            if (!minTCIng || this.props.ingredients[index].nutrition.totalCarbohydrates < minTCIng.nutrition.totalCarbohydrates) {
                minTCIng = this.props.ingredients[index];
            }
            if (!maxSIng || this.props.ingredients[index].nutrition.sugar > maxSIng.nutrition.sugar) {
                maxSIng = this.props.ingredients[index];
            }
            if (!minSIng || this.props.ingredients[index].nutrition.sugar < minSIng.nutrition.sugar) {
                minSIng = this.props.ingredients[index];
            }
            if (!maxPIng || this.props.ingredients[index].nutrition.proteine > maxPIng.nutrition.proteine) {
                maxPIng = this.props.ingredients[index];
            }
            if (!minPIng || this.props.ingredients[index].nutrition.proteine < minPIng.nutrition.proteine) {
                minPIng = this.props.ingredients[index];
            }
        }

        for (let index = 0; index < this.props.recipes.length; index++) {
            sumCalRec += this.props.recipes[index].nutrition.calories;
            sumSFRec += this.props.recipes[index].nutrition.saturatedFats;
            sumTFRec += this.props.recipes[index].nutrition.totalFats;
            sumTCRec += this.props.recipes[index].nutrition.totalCarbohydrates;
            sumSRec += this.props.recipes[index].nutrition.sugar;
            sumPRec += this.props.recipes[index].nutrition.proteine;

            if (!mostIngsRec || this.props.recipes[index].ingredients.length > mostIngsRec.ingredients.length) {
                mostIngsRec = this.props.recipes[index];
            }
            if (!leastIngsRec || this.props.recipes[index].ingredients.length < leastIngsRec.ingredients.length) {
                leastIngsRec = this.props.recipes[index];
            }
            if (!maxCalRec || this.props.recipes[index].nutrition.calories > maxCalRec.nutrition.calories) {
                maxCalRec = this.props.recipes[index];
            }
            if (!minCalRec || this.props.recipes[index].nutrition.calories < minCalRec.nutrition.calories) {
                minCalRec = this.props.recipes[index];
            }
            if (!maxSFRec || this.props.recipes[index].nutrition.saturatedFats > maxSFRec.nutrition.saturatedFats) {
                maxSFRec = this.props.recipes[index];
            }
            if (!minSFRec || this.props.recipes[index].nutrition.saturatedFats < minSFRec.nutrition.saturatedFats) {
                minSFRec = this.props.recipes[index];
            }
            if (!maxTFRec || this.props.recipes[index].nutrition.totalFats > maxTFRec.nutrition.totalFats) {
                maxTFRec = this.props.recipes[index];
            }
            if (!minTFRec || this.props.recipes[index].nutrition.totalFats < minTFRec.nutrition.totalFats) {
                minTFRec = this.props.recipes[index];
            }
            if (!maxTCRec || this.props.recipes[index].nutrition.totalCarbohydrates > maxTCRec.nutrition.totalCarbohydrates) {
                maxTCRec = this.props.recipes[index];
            }
            if (!minTCRec || this.props.recipes[index].nutrition.totalCarbohydrates < minTCRec.nutrition.totalCarbohydrates) {
                minTCRec = this.props.recipes[index];
            }
            if (!maxSRec || this.props.recipes[index].nutrition.sugar > maxSRec.nutrition.sugar) {
                maxSRec = this.props.recipes[index];
            }
            if (!minSRec || this.props.recipes[index].nutrition.sugar < minSRec.nutrition.sugar) {
                minSRec = this.props.recipes[index];
            }
            if (!maxPRec || this.props.recipes[index].nutrition.proteine > maxPRec.nutrition.proteine) {
                maxPRec = this.props.recipes[index];
            }
            if (!minPRec || this.props.recipes[index].nutrition.proteine < minPRec.nutrition.proteine) {
                minPRec = this.props.recipes[index];
            }
        }
        

        return (
            <div>
                {data}
                 <Grid container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        spacing={3}>
                        <Grid item xs={12} md={5} style={{maxHeight:'860px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                        <IngredientsSummary 
                            count={this.props.ingredients.length}
                            mostUsed={mostUsedIng}
                            leastUsed={leastUsedIng}
                            maxCal={maxCalIng}
                            minCal={minCalIng}
                            avgCal={Math.round(((sumCalIng/this.props.ingredients.length) + Number.EPSILON) * 100) / 100}
                            maxSF={maxSFIng}
                            minSF={minSFIng}
                            avgSF={Math.round(((sumSFIng/this.props.ingredients.length) + Number.EPSILON) * 100) / 100}
                            maxTF={maxTFIng}
                            minTF={minTFIng}
                            avgTF={Math.round(((sumTFIng/this.props.ingredients.length) + Number.EPSILON) * 100) / 100}
                            maxTC={maxTCIng}
                            minTC={minTCIng}
                            avgTC={Math.round(((sumTCIng/this.props.ingredients.length) + Number.EPSILON) * 100) / 100}
                            maxS={maxSIng}
                            minS={minSIng}
                            avgS={Math.round(((sumSIng/this.props.ingredients.length) + Number.EPSILON) * 100) / 100}
                            maxP={maxPIng}
                            minP={minPIng}
                            avgP={Math.round(((sumPIng/this.props.ingredients.length) + Number.EPSILON) * 100) / 100}
                        />
                        </Grid> 
                        <Grid item xs={12} md={7} style={{maxHeight:'860px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                        <RecipesSummary 
                            count={this.props.recipes.length}
                            mostIngs={mostIngsRec}
                            leastIngs={leastIngsRec}
                            maxCal={maxCalRec}
                            minCal={minCalRec}
                            avgCal={Math.round(((sumCalRec/this.props.recipes.length) + Number.EPSILON) * 100) / 100}
                            maxSF={maxSFRec}
                            minSF={minSFRec}
                            avgSF={Math.round(((sumSFRec/this.props.recipes.length) + Number.EPSILON) * 100) / 100}
                            maxTF={maxTFRec}
                            minTF={minTFRec}
                            avgTF={Math.round(((sumTFRec/this.props.recipes.length) + Number.EPSILON) * 100) / 100}
                            maxTC={maxTCRec}
                            minTC={minTCRec}
                            avgTC={Math.round(((sumTCRec/this.props.recipes.length) + Number.EPSILON) * 100) / 100}
                            maxS={maxSRec}
                            minS={minSRec}
                            avgS={Math.round(((sumSRec/this.props.recipes.length) + Number.EPSILON) * 100) / 100}
                            maxP={maxPRec}
                            minP={minPRec}
                            avgP={Math.round(((sumPRec/this.props.recipes.length) + Number.EPSILON) * 100) / 100}
                        />
                        </Grid>
                        <Grid item xs={12} md={12} style={{ padding: '20px', backgroundColor: '#f5f5f5'}}>
                            <Divider style={{ padding: '1px', marginTop: '', backgroundColor: '#3f50b5'}}></Divider>
                        </Grid>
                        <Grid item xs={12} md={12} style={{maxHeight:'860px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                        {inputNutrition}
                        </Grid> 
                        <Grid item xs={12} md={6} style={{maxHeight:'860px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                        {chartDailyNutrition}
                        </Grid> 
                        <Grid item xs={12} md={6} style={{maxHeight:'860px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                        {chartNutritionEntries}
                        </Grid>
                        <Grid item xs={12} md={12} style={{ padding: '20px', backgroundColor: '#f5f5f5'}}>
                            <Divider style={{ padding: '1px', marginTop: '', backgroundColor: '#3f50b5'}}></Divider>
                        </Grid>
                        <Grid item xs={12} md={6} style={{minHeight:'100px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                        {inputUser}
                        </Grid> 
                        <Grid item xs={12} md={6} style={{minHeight:'100px', overflow: 'auto', padding: '', backgroundColor: '#f5f5f5'}}>
                        <Input
                                elementType={this.state.searchUsers.elementType}
                                elementConfig={this.state.searchUsers.elementConfig}
                                value={this.state.searchUsers.value}
                                changed={(event) => this.searchUsersHandler(event)}
                                search={this.applySearch}
                            />
                        </Grid> 
                        <Grid item xs={12} md={6} style={{minHeight:'700px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                        {chartUsers}
                        </Grid>
                        <Grid item xs={12} md={6} style={{height:'700px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                            <Users users={this.state.filteredUsers.length === 0 ? this.props.users : this.state.filteredUsers}/>
                        </Grid>
                </Grid>
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
        users: state.users.users,
        loadingUsers: state.users.loading,
        shoppingLists: state.shoppingLists.shoppingLists,
        loadingShoppingLists: state.shoppingLists.loading,
        dailyNutrition: state.dailyNutrition.dailyNutrition,
        loadingDailyNutrition: state.dailyNutrition.loading,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchRecipes: (token) => dispatch(actions.fetchRecipes(token)),
        onFetchIngredients: (token) => dispatch(actions.fetchIngredients(token)),
        onFetchUsers: (token) => dispatch(actions.fetchUsers(token)),
        onFetchShoppingLists: (token) => dispatch(actions.fetchShoppingLists(token)),
        onFetchDailyNutrition: (token) => dispatch(actions.fetchDailyNutrition(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);

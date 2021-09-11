import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';
import Ingredients from '../../components/Ingredients/Ingredients';
import Recipes from '../../components/Recipes/Recipes';
import RecipeDetails from '../../components/Recipes/RecipeDetails/RecipeDetails';
import Grid from '@material-ui/core/Grid';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Dialog from '../../components/UI/Dialog/Dialog';
import Snackbar from '../../components/UI/Snackbar/Snackbar';
import IngredientCagories from '../../components/IngredientCategories/IngredientCategories';
import RecipeCagories from '../../components/RecipeCategories/RecipeCategories';
import MeasurementUnits from '../../components/MeasurementUnits/MeasurementUnits';
import { Divider } from '@material-ui/core';


export class AnalyticsPage extends Component {
    state = {
        showSnackbar: false,
        message: null,
        severity: null,
        newCategoryForm: {
            name: {
                elementType: 'textfieldwithstaticlabel',
                elementConfig: {
                    type: 'text',
                    label: 'Name',
                },
                staticlabel: '',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            displayName: {
                elementType: 'textfieldwithstaticlabel',
                elementConfig: {
                    type: 'text',
                    label: 'Display Name'
                },
                staticlabel: '',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        newMeasurementUnitForm: {
            name: {
                elementType: 'textfieldwithstaticlabel',
                elementConfig: {
                    type: 'text',
                    label: 'Name',
                },
                staticlabel: '',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            displayName: {
                elementType: 'textfieldwithstaticlabel',
                elementConfig: {
                    type: 'text',
                    label: 'Display Name'
                },
                staticlabel: '',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            perName: {
                elementType: 'textfieldwithstaticlabel',
                elementConfig: {
                    type: 'text',
                    label: 'Per Name'
                },
                staticlabel: '',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        formValid: false,
        openCategoryModal: false,
        categoryModalType: null,
        openMeasurementUnitModal: false,
        editMode: false,
        editingId: null,
        openDetailsModal: false,
        detailsRecipe: null,
        searchRecipes: {
            elementType: 'search',
            elementConfig: {
                type: 'search',
                placeholder: 'Search Recipes',
            },
            value: ""
        },
        searchIngredients: {
            elementType: 'search',
            elementConfig: {
                type: 'search',
                placeholder: 'Search Ingredients',
            },
            value: ""
        },
        filteredRecpies: [],
        filteredIngredients: [],
        showPublicRecipeDialog: false,
        showPublicIngredientDialog: false,
        idForPublic: null,
        idForDelete: null,
        showDeleteIngredientCategoryDialog: false,
        showDeleteRecipeCategoryDialog: false,
        showDeleteMeasurementUnitDialog: false
    }

    componentDidMount() {
        this.props.onFetchRecipes(this.props.token);
        this.props.onFetchIngredients(this.props.token);
        this.props.onFetchRecipeCategories(this.props.token);
        this.props.onFetchIngredientCategories(this.props.token);
        this.props.onFetchMesurementUnits(this.props.token);
    }

    openCategoryModal = (type) => {
        this.setState({
            openCategoryModal: true,
            categoryModalType: type
        });
    }

    closeCategoryModal = () => {
        this.setState({
            openCategoryModal: false,
            categoryModalType: null,
            editMode: false,
            editingId: null
        });
        this.resetCategoryForm();
    }

    openMeasurementUnitModal = () => {
        this.setState({
            openMeasurementUnitModal: true
        });
    }

    closeMeasurementUnitModal = () => {
        this.setState({
            openMeasurementUnitModal: false,
            editMode: false,
            editingId: null
        });
        this.resetMeasurementUnitForm();
    }

    openDetailsModal = (recId) => {
        const recipe = this.props.recipes.find(rec => { return rec.id === recId });
        console.log('hej');
        console.log(recipe);
        this.setState({
            openDetailsModal: true,
            detailsRecipe: recipe
        });
    }

    closeDetailsModal = () => {
        this.setState({
            openDetailsModal: false
        });
    }

    openEditMode = (editId) => {
        this.setState(prevState => ({
            editMode: true,
            editingId: editId
        }));
    }

    resetCategoryForm = () => {
        this.setState(prevState => ({
            ...prevState,
            newCategoryForm: {
                ...prevState.newCategoryForm,
                name: {
                    ...prevState.newCategoryForm.name,
                    value: '',
                    valid: false,
                    touched: false
                },
                displayName: {
                    ...prevState.newCategoryForm.displayName,
                    value: '',
                    valid: false,
                    touched: false
                }
            },
            formValid: false
        }))
    }

    resetMeasurementUnitForm = () => {
        this.setState(prevState => ({
            ...prevState,
            newMeasurementUnitForm: {
                ...prevState.newMeasurementUnitForm,
                name: {
                    ...prevState.newMeasurementUnitForm.name,
                    value: '',
                    valid: false,
                    touched: false
                },
                displayName: {
                    ...prevState.newMeasurementUnitForm.displayName,
                    value: '',
                    valid: false,
                    touched: false
                },
                perName: {
                    ...prevState.newMeasurementUnitForm.perName,
                    value: '',
                    valid: false,
                    touched: false
                }
            },
            formValid: false
        }))
    }

    inputChangedHandlerCategory = (event, inputIdentifier) => {
        let value = event.target.value

        const updatedFormElement = updateObject(this.state.newCategoryForm[inputIdentifier], {
            value: value,
            valid: checkValidity(value, this.state.newCategoryForm[inputIdentifier].validation),
            touched: true
        });

        const updatedNewCategoryFormm = updateObject(this.state.newCategoryForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedNewCategoryFormm) {
            formIsValid = updatedNewCategoryFormm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ newCategoryForm: updatedNewCategoryFormm, formValid: formIsValid })
    }

    inputChangedHandlerMeasurementUnit = (event, inputIdentifier) => {
        let value = event.target.value
        
        const updatedFormElement = updateObject(this.state.newMeasurementUnitForm[inputIdentifier], {
            value: value,
            valid: checkValidity(value, this.state.newMeasurementUnitForm[inputIdentifier].validation),
            touched: true
        });

        const updatedNewMeasurementUnitForm = updateObject(this.state.newMeasurementUnitForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedNewMeasurementUnitForm) {
            formIsValid = updatedNewMeasurementUnitForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ newMeasurementUnitForm: updatedNewMeasurementUnitForm, formValid: formIsValid })
    }

    openEditCategory = (categoryId, type) => {
        this.openEditMode(categoryId);

        let cForEdit;
        if (type === 'recipe') {
            const categoryForEditA = this.props.recipeCategories.filter(rc => {
                return rc.id === categoryId;
            })
            cForEdit = categoryForEditA[0];
        } else {
            const categoryForEditA = this.props.ingredientCategories.filter(ic => {
                return ic.id === categoryId;
            })
            cForEdit = categoryForEditA[0];
        }

        const updatedFormElementName = updateObject(this.state.newCategoryForm['name'], {
            value: cForEdit.name,
            valid: true,
            touched: true
        });

        const updatedFormElementDisplayName = updateObject(this.state.newCategoryForm['displayName'], {
            value: cForEdit.displayName,
            valid: true,
            touched: true
        });

        const updatedNewCategoryForm = updateObject(this.state.newCategoryForm, {
            name: updatedFormElementName,
            displayName: updatedFormElementDisplayName
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedNewCategoryForm) {
            formIsValid = updatedNewCategoryForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ newCategoryForm: updatedNewCategoryForm, formValid: formIsValid })

        this.openCategoryModal(type);
    }    

    openEditMeasurementUnit = (measurementUnitId) => {
        this.openEditMode(measurementUnitId);

        const measurementUnitForEditA = this.props.measurementUnits.filter(mu => {
            return mu.id === measurementUnitId;
        })
        const muForEdit = measurementUnitForEditA[0];
       

        const updatedFormElementName = updateObject(this.state.newMeasurementUnitForm['name'], {
            value: muForEdit.name,
            valid: true,
            touched: true
        });

        const updatedFormElementDisplayName = updateObject(this.state.newMeasurementUnitForm['displayName'], {
            value: muForEdit.displayName,
            valid: true,
            touched: true
        });

        const updatedFormElementPerName = updateObject(this.state.newMeasurementUnitForm['displayName'], {
            value: muForEdit.perName,
            valid: true,
            touched: true
        });

        const updatedNewMeasurementUnitForm = updateObject(this.state.newMeasurementUnitForm, {
            name: updatedFormElementName,
            displayName: updatedFormElementDisplayName,
            perName: updatedFormElementPerName
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedNewMeasurementUnitForm) {
            formIsValid = updatedNewMeasurementUnitForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ newMeasurementUnitForm: updatedNewMeasurementUnitForm, formValid: formIsValid })

        this.openMeasurementUnitModal();
    }    

    addCategoryHadler = (type) => {
        const formData = [];
        for (let formElementIdentifier in this.state.newCategoryForm) {
            formData[formElementIdentifier] = this.state.newCategoryForm[formElementIdentifier].value
        }

        const newCategory = {
            ...formData
        }
        if (type === 'recipe') {
            this.props.onAddRecipeCategory(newCategory, this.props.token);
        } else {
            this.props.onAddIngredientCategory(newCategory, this.props.token);
        }
        
        this.closeCategoryModal();
    }

    addMeasurementUnitHadler = () => {
        const formData = [];
        for (let formElementIdentifier in this.state.newMeasurementUnitForm) {
            formData[formElementIdentifier] = this.state.newMeasurementUnitForm[formElementIdentifier].value
        }

        const newMeasurementUnit = {
            ...formData
        }

        this.props.onAddMesurementUnit(newMeasurementUnit, this.props.token);    
        
        this.closeMeasurementUnitModal();
    }

    editCategoryHadler = (type) => {
        const formData = [];
        for (let formElementIdentifier in this.state.newCategoryForm) {
            formData[formElementIdentifier] = this.state.newCategoryForm[formElementIdentifier].value
        }

        const newCategory = {
            ...formData
        }
        if (type === 'recipe') {
            this.props.onEditRecipeCategory(this.state.editingId, newCategory, this.props.token);
        } else {
            this.props.onEditIngredientCategory(this.state.editingId, newCategory, this.props.token);
        }
        
        this.closeCategoryModal();
    }

    editMeasurementUnitHadler = () => {
        const formData = [];
        for (let formElementIdentifier in this.state.newMeasurementUnitForm) {
            formData[formElementIdentifier] = this.state.newMeasurementUnitForm[formElementIdentifier].value
        }

        const newMeasurementUnit = {
            ...formData
        }

        this.props.onEditMesurementUnit(this.state.editingId, newMeasurementUnit, this.props.token);    
        
        this.closeMeasurementUnitModal();
    }

    deleteCategoryHandler = (type) => {
        console.log("delete");
        if (type === 'recipe') {
            this.props.onDeleteRecipeCategory(this.state.idForDelete, this.props.token);
            this.setState({ showDeleteRecipeCategoryDialog: false, idForDelete: null });
        } else {
            this.props.onDeleteIngredientCategory(this.state.idForDelete, this.props.token);
            this.setState({ showDeleteIngredientCategoryDialog: false, idForDelete: null });
        }
    }

    deleteIc = (rcId, type) => {
        if (type === 'recipe') {
            this.setState({ showDeleteRecipeCategoryDialog: true, idForDelete: rcId });
        } else {
            this.setState({ showDeleteIngredientCategoryDialog: true, idForDelete: rcId });
        }
    }

    deleteMeasurementUnitHandler = () => {
        console.log("delete");
        this.props.onDeleteMesurementUnit(this.state.idForDelete, this.props.token);
        this.setState({ showDeleteMeasurementUnitDialog: false, idForDelete: null });
    }

    deleteMu = (muId) => {
        this.setState({ showDeleteMeasurementUnitDialog: true, idForDelete: muId });
    }

    unmakeRecipePublicHandler = () => {
        this.props.onUnmakeRecipePublic(this.state.idForPublic, this.props.token);
        setTimeout(() => {
            this.setState({ showPublicRecipeDialog: false, idForPublic: null });
            this.props.onFetchRecipes(this.props.token);
        },500);
    }

    unmakeRp = (recId) => {
        this.setState({ showPublicRecipeDialog: true, idForPublic: recId });
    }

    unmakeIngredientPublicHandler = () => {
        this.props.onUnmakeIngredientPublic(this.state.idForPublic, this.props.token);
        setTimeout(() => {
            this.setState({ showPublicIngredientDialog: false, idForPublic: null });
            this.props.onFetchIngredients(this.props.token);
        },500);
    }

    unmakeIp = (ingId) => {
        this.setState({ showPublicIngredientDialog: true, idForPublic: ingId });
    }

    searchRecipesHandler = (event) => {
        let value = event.target.value

        const updatedSearchValue = updateObject(this.state.searchRecipes, {
            value: value
        });

        this.setState({ searchRecipes: updatedSearchValue });
    }

    searchIngredientsHandler = (event) => {
        let value = event.target.value

        const updatedSearchValue = updateObject(this.state.searchIngredients, {
            value: value
        });

        this.setState({ searchIngredients: updatedSearchValue });
    }

    applySearch = () => {
        const ings = this.props.ingredients;
        const recs = this.props.recipes;
        let filteredIngs = [];
        let filteredRecs = [];

        // eslint-disable-next-line array-callback-return
        ings.map(ing => {
            /*  console.log(ing.calories); */
                if (this.state.searchIngredients.value === "") {
                    filteredIngs.push(ing);
                    console.log(ing);
                } else if (ing.name.toLowerCase().includes(this.state.searchIngredients.value.toLowerCase())) {
                    filteredIngs.push(ing);
                    console.log(ing);
                } 
            });
        if (filteredIngs.length === 0) {
            // neki dialog message da nema pronadjenih elemenata!!!!!!!!!
            this.setState({ showSnackbar: true, message: 'No such ingredients found', severity: 'warning' }, () => {
                setTimeout(() => {
                    this.setState({ showSnackbar: false, message: null, severity: null })
                }, 3000);
            })
        }
        if (filteredIngs.length === this.props.ingredients.length) {
            filteredIngs = [];
        }

        // eslint-disable-next-line array-callback-return
        recs.map(rec => {
            /*  console.log(ing.calories); */
                if (this.state.searchRecipes.value === "") {
                    filteredRecs.push(rec);
                    console.log(rec);
                } else if (rec.name.toLowerCase().includes(this.state.searchRecipes.value.toLowerCase())) {
                    filteredRecs.push(rec);
                    console.log(rec);
                } 
            });
        if (filteredRecs.length === 0) {
            // neki dialog message da nema pronadjenih elemenata!!!!!!!!!
            this.setState({ showSnackbar: true, message: 'No such recipes found', severity: 'warning' }, () => {
                setTimeout(() => {
                    this.setState({ showSnackbar: false, message: null, severity: null })
                }, 3000);
            })
        }
        if (filteredRecs.length === this.props.recipes.length) {
            filteredRecs = [];
        }
        this.setState({ filteredRecpies: filteredRecs, filteredIngredients: filteredIngs });
    }

    render() {
        let data = (
            <Spinner show={this.props.loadingRecipes || this.props.loadingIngredients || this.props.loadingRecipeCategories
                || this.props.loadingIngredientCategories || this.props.loadingMeasurementUnits} />
        );
        
        let ingredientCategoryModalButton = (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => this.addCategoryHadler('ingredient')}
                disabled={!this.state.formValid}
                startIcon={<AddIcon />}>ADD INGREDIENT CATEGORY
            </Button>
        );

        if (this.state.editMode) {
            ingredientCategoryModalButton = (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.editCategoryHadler('ingredient')}
                    disabled={!this.state.formValid}
                    startIcon={<EditOutlinedIcon />}>EDIT INGREDIENT CATEGORY
                </Button>
            );
        }

        let recipeCategoryModalButton = (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => this.addCategoryHadler('recipe')}
                disabled={!this.state.formValid}
                startIcon={<AddIcon />}>ADD RECIPE CATEGORY
            </Button>
        );

        if (this.state.editMode) {
            recipeCategoryModalButton = (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.editCategoryHadler('recipe')}
                    disabled={!this.state.formValid}
                    startIcon={<EditOutlinedIcon />}>EDIT RECIPE CATEGORY
                </Button>
            );
        }

        let measurementUnitModalButton = (
            <Button
                variant="contained"
                color="secondary"
                onClick={this.addMeasurementUnitHadler}
                disabled={!this.state.formValid}
                startIcon={<AddIcon />}>ADD MEASUREMENT UNIT
            </Button>
        );

        if (this.state.editMode) {
            measurementUnitModalButton = (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.editMeasurementUnitHadler}
                    disabled={!this.state.formValid}
                    startIcon={<EditOutlinedIcon />}>EDIT MEASUREMENT UNIT
                </Button>
            );
        }

        const formElementsArray = [];
        for (let key in this.state.newCategoryForm) {
            formElementsArray.push({
                id: key,
                config: this.state.newCategoryForm[key]
            });
        }
        /* console.log(formElementsArray); */
        let formCategory = formElementsArray.map(formElement => (
            <Grid item xs={12} sm={10} md={8} lg={7} key={formElement.id}>
                <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandlerCategory(event, formElement.id)}
                     />
            </Grid>
        ));

        const formElementsArray2 = [];
        for (let key in this.state.newMeasurementUnitForm) {
            formElementsArray2.push({
                id: key,
                config: this.state.newMeasurementUnitForm[key]
            });
        }
        /* console.log(formElementsArray); */
        let formMeasurementUnit = formElementsArray2.map(formElement => (
            <Grid item xs={12} sm={10} md={8} lg={7} key={formElement.id}>
                <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandlerMeasurementUnit(event, formElement.id)}
                     />
            </Grid>
        ));

        if(!this.props.loadingRecipes && !this.props.loadingIngredients && !this.props.loadingRecipeCategories
            && !this.props.loadingIngredientCategories && !this.props.loadingMeasurementUnits) {
            console.log(this.props.recipes);
            console.log(this.props.ingredients);
            console.log(this.props.recipeCategories);
            console.log(this.props.ingredientCategories);
            console.log(this.props.measurementUnits);

            data = (
                <div>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        spacing={3}>

                        <Grid item xs={12} md={4} style={{maxHeight:'700px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                            <Input
                                elementType={this.state.searchIngredients.elementType}
                                elementConfig={this.state.searchIngredients.elementConfig}
                                value={this.state.searchIngredients.value}
                                changed={(event) => this.searchIngredientsHandler(event)}
                                search={this.applySearch}
                            />
                            <Ingredients
                                ingredients={this.state.filteredIngredients.length === 0 ? this.props.ingredients.filter(ing => {
                                    return ing.public === true;
                                }) : this.state.filteredIngredients.filter(ing => {
                                    return ing.public === true;
                                })}
                                unmakePublic={(ingId) => this.unmakeIp(ingId)}
                            />
                        </Grid>
                        <Grid item xs={12} md={8} style={{maxHeight:'700px', overflow: 'auto', padding: '20px', backgroundColor: '#f5f5f5'}}>
                            <Input
                                elementType={this.state.searchRecipes.elementType}
                                elementConfig={this.state.searchRecipes.elementConfig}
                                value={this.state.searchRecipes.value}
                                changed={(event) => this.searchRecipesHandler(event)}
                                search={this.applySearch}
                            />
                            <Recipes
                                recipes={this.state.filteredRecpies.length === 0 ? this.props.recipes.filter(rec => {
                                    return rec.public === true;
                                }) : this.state.filteredRecpies.filter(rec => {
                                    return rec.public === true;
                                })}
                                openDetails={(recId) => this.openDetailsModal(recId)}
                                unmakePublic={(recId) => this.unmakeRp(recId)}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} style={{ padding: '0px', backgroundColor: '#f5f5f5'}}>
                            <Divider style={{ padding: '1px', marginTop: '', backgroundColor: '#3f50b5'}}></Divider>
                        </Grid>
                        <Grid item xs={12} md={4} style={{padding: '20px', paddingTop:'30px', backgroundColor: '#f5f5f5'}}>
                            <IngredientCagories
                                ingredientCategories={this.props.ingredientCategories}
                                add={() => this.openCategoryModal('ingredient')}
                                edit={(icId) => this.openEditCategory(icId, 'ingredient')}
                                delete={(icId) => this.deleteIc(icId, 'ingredient')}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} style={{padding: '20px', paddingTop:'30px', backgroundColor: '#f5f5f5'}}>
                            <MeasurementUnits
                                measurementUnits={this.props.measurementUnits}
                                add={this.openMeasurementUnitModal}
                                edit={(muId) => this.openEditMeasurementUnit(muId)}
                                delete={(muId) => this.deleteMu(muId)}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} style={{padding: '20px', paddingTop:'30px', backgroundColor: '#f5f5f5'}}>
                            <RecipeCagories
                                recipeCategories={this.props.recipeCategories}
                                add={() => this.openCategoryModal('recipe')}
                                edit={(rcId) => this.openEditCategory(rcId, 'recipe')}
                                delete={(rcId) => this.deleteIc(rcId, 'recipe')}
                            />
                        </Grid>
                        <hr></hr>
                    </Grid>

                    <Modal show={this.state.openDetailsModal} modalClosed={this.closeDetailsModal}>
                        <Grid container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={1}>
                            <RecipeDetails 
                                recipe={this.state.detailsRecipe}
                                measurementUnits={this.props.measurementUnits}
                            />
                        </Grid>
                    </Modal>
                    <Modal show={this.state.openCategoryModal} modalClosed={this.closeCategoryModal} style={{maxHeight: '200px'}}>
                        <Grid container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={1}>
                            {formCategory}
                            <Grid item sm={12} style={{padding: '30px'}}>
                                {this.state.categoryModalType === 'recipe' ? recipeCategoryModalButton : ingredientCategoryModalButton}
                            </Grid>
                        </Grid>
                    </Modal>
                    <Modal show={this.state.openMeasurementUnitModal} modalClosed={this.closeMeasurementUnitModal}>
                        <Grid container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={1}>
                            {formMeasurementUnit}
                            <Grid item sm={12} style={{padding: '30px'}}>
                                {measurementUnitModalButton}
                            </Grid>
                        </Grid>
                    </Modal>
                    <Dialog
                        show={this.state.showDeleteRecipeCategoryDialog}
                        title={'Delete recipe category?'}
                        content={'This recipe category will be permanently deleted.'}
                        onCancel={() => { this.setState({ showDeleteRecipeCategoryDialog: false, ingIdForDelete: null  }) }}
                        onOk={() => this.deleteCategoryHandler('recipe')} />
                    <Dialog
                        show={this.state.showDeleteIngredientCategoryDialog}
                        title={'Delete ingredient category?'}
                        content={'This ingredient category will be permanently deleted.'}
                        onCancel={() => { this.setState({ showDeleteIngredientCategoryDialog: false, ingIdForDelete: null  }) }}
                        onOk={() => this.deleteCategoryHandler('ingredient')} />
                    <Dialog
                        show={this.state.showDeleteMeasurementUnitDialog}
                        title={'Delete measurement unit?'}
                        content={'This measurement unit will be permanently deleted.'}
                        onCancel={() => { this.setState({ showDeleteMeasurementUnitDialog: false, ingIdForDelete: null  }) }}
                        onOk={this.deleteMeasurementUnitHandler} />
                    <Dialog
                        show={this.state.showPublicRecipeDialog}
                        title={'Remove public status from recipe?'}
                        content={'Recipe can become public again if a user requests a review.'}
                        onCancel={() => { this.setState({ showPublicRecipeDialog: false, idForPublic: null  }) }}
                        onOk={this.unmakeRecipePublicHandler} />
                    <Dialog
                        show={this.state.showPublicIngredientDialog}
                        title={'Remove public status from ingredient?'}
                        content={'Ingredient can become public again if a user requests a review.'}
                        onCancel={() => { this.setState({ showPublicIngredientDialog: false, idForPublic: null  }) }}
                        onOk={this.unmakeIngredientPublicHandler} />
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
        recipeCategories: state.recipeCategories.recipeCategories,
        loadingRecipeCategories: state.recipeCategories.loading,
        ingredientCategories: state.ingredientCategories.ingredientCategories,
        loadingIngredientCategories: state.ingredientCategories.loading,
        measurementUnits: state.measurementUnits.measurementUnits,
        loadingMeasurementUnits: state.measurementUnits.loading,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchRecipes: (token) => dispatch(actions.fetchRecipes(token)),
        onFetchIngredients: (token) => dispatch(actions.fetchIngredients(token)),
        onFetchRecipeCategories: (token) => dispatch(actions.fetchRecipeCategories(token)),
        onFetchIngredientCategories: (token) => dispatch(actions.fetchIngredientCategories(token)),
        onFetchMesurementUnits: (token) => dispatch(actions.fetchMeasurementUnits(token)),
        onAddRecipeCategory: (recipeCategoryData, token) => dispatch(actions.addRecipeCategories(recipeCategoryData, token)),
        onEditRecipeCategory: (rcId, recipeCategoryData, token) => dispatch(actions.editRecipeCategories(rcId, recipeCategoryData, token)),
        onDeleteRecipeCategory: (rcId, token) => dispatch(actions.deleteRecipeCategories(rcId, token)),
        onAddIngredientCategory: (ingredientCategoryData, token) => dispatch(actions.addIngredientCategories(ingredientCategoryData, token)),
        onEditIngredientCategory: (icId, ingredientCategoryData, token) => dispatch(actions.editIngredientCategories(icId, ingredientCategoryData, token)),
        onDeleteIngredientCategory: (icId, token) => dispatch(actions.deleteIngredientCategories(icId, token)),
        onAddMesurementUnit: (measurementUnitData, token) => dispatch(actions.addMeasurementUnits(measurementUnitData, token)),
        onEditMesurementUnit: (muId, measurementUnitData, token) => dispatch(actions.editMeasurementUnits(muId, measurementUnitData, token)),
        onDeleteMesurementUnit: (muId, token) => dispatch(actions.deleteMeasurementUnits(muId, token)),
        onUnmakeRecipePublic: (recId, token) => dispatch(actions.unmakeRecipePublic(recId, token)),
        onUnmakeIngredientPublic: (ingId, token) => dispatch(actions.unmakeIngredientPublic(ingId, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
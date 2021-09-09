import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import recipeReducer from './store/reducers/recipe';
import ingredientReducer from './store/reducers/ingredient';
import shoppingListReducer from './store/reducers/shoppingList';
import ingredientCategoriesReducer from './store/reducers/ingredientCategory';
import recipeCategoriesReducer from './store/reducers/recipeCategory';
import measurementUnitsReducer from './store/reducers/measurementUnit';
import authReducer from './store/reducers/auth';
import reportWebVitals from './reportWebVitals';

const composeEnhancers = /* process.env.NODE_ENV === 'development' ? */ window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ /* : null */ || compose;

const rootReducer = combineReducers({
  recipe: recipeReducer,
  ingredient: ingredientReducer,
  shoppingList: shoppingListReducer,
  ingredientCategories: ingredientCategoriesReducer,
  recipeCategories: recipeCategoriesReducer,
  measurementUnits: measurementUnitsReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(        // da bi mogli da korisimo async code u action creators (thunk)
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
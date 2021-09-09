import './App.css';
import Appbar from './hoc/Appbar/Appbar';
import * as actions from './store/actions/index';
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Logout from './containers/Auth/Logout/Logout';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncDataManagement = asyncComponent(() => {
  return import('./containers/DataManagementPage/DataManagementPage');
});

const asyncPendingReviews = asyncComponent(() => {
  return import('./containers/PendingReviewsPage/PendingReviewsPage');
});

const asyncAnalytics = asyncComponent(() => {
  return import('./containers/AnalyticsPage/AnalyticsPage');
});

export class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/auth" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/datamanagement" component={asyncDataManagement} />
          <Route path="/pendingreviews" exact component={asyncPendingReviews} />
          <Route path="/analytics" exact component={asyncAnalytics} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/datamanagement" />
        </Switch>
      );
    }

    return (
      <div>
        <Appbar>
          {routes}
        </Appbar>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { Component } from 'react';
import { updateObject, checkValidity } from '../../shared/utility';
import Button from '@material-ui/core/Button';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Input from '../../components/UI/Input/Input';
import { Paper } from '@material-ui/core';
import Logo from '../../images/logo.png'

class Auth extends Component {
    state = {
        loginForm: {
            email: {
                elementType: 'textfield',
                elementConfig: {
                    type: 'email',
                    required: true,
                    label: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'textfield',
                elementConfig: {
                    type: 'password',
                    required: true,
                    label: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        validForm: false
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.loginForm, {
            [controlName]: updateObject(this.state.loginForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.loginForm[controlName].validation),
                touched: true
            })
        });

        this.setState({ loginForm: updatedControls }, () => {
            let validForm = true;
            for (let key in this.state.loginForm) {
                if (!this.state.loginForm[key].valid) {
                    validForm = false;
                }
            }
            this.setState({ validForm: validForm });
        });
        

    }

    submitHadler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.loginForm.email.value, this.state.loginForm.password.value, this.state.isSignup, null);
    }

    render() {
        const loginFormElementArray = [];

        for (let key in this.state.loginForm) {
            loginFormElementArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        let loginForm = loginFormElementArray.map(formElement => (
            <Grid item xs={12} sm={10} md={8} lg={7} key={formElement.id}>
                <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            </Grid>
        ));

        let logo = null;
        if (!this.state.isSignup) {
            logo = (
                <Grid item xs={6} sm={4} md={3} lg={2}>
                    <Paper elevation={0} style={{
                        overflow: 'hidden',
                        backgroundColor: '#fafafa',
                        borderColor: '#fafafa'
                    }}>
                        <img src={Logo} alt="logo" style={{
                            width: '100%',
                            height: 'auto'
                        }} />
                    </Paper>
                </Grid>
            );
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>       // .message je od firebase-a poruka
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div>
                <Spinner show={this.props.loading} />
                {authRedirect}
                {errorMessage}
                <br />
                <br />
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={5}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={5}>
                        {logo}
                    </Grid>

                    {loginForm}
                </Grid>
                <br />
                <br />
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={5}>
                    <Grid item sm={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.submitHadler}
                            disabled={!this.state.validForm}
                            endIcon={<SendOutlinedIcon />}>{'LOGIN'}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,         // mora .auth zbog combineReducers u index.js
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup, userData) => dispatch(actions.auth(email, password, isSignup, userData)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

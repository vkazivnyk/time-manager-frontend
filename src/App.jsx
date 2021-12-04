import React, { Component } from 'react';
import './App.module.scss';
import HomePage from './containers/Home/HomePage';
import AuthPage from './containers/Auth/AuthPage';
import Register from './containers/Register/RegisterPage';
import Layout from './Layout/Layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import { credentials } from './global/js/credentials';
import { authToken } from './global/js/authToken';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: credentials.get(),
            isAuthenticated: authToken.valid(),
        };
    }

    onLogin = () => {
        this.setState({
            currentUser: credentials.get(),
            isAuthenticated: authToken.valid(),
        });
    };

    render() {
        const { isAuthenticated } = this.state;

        return (
            <Layout>
                {isAuthenticated ? (
                    <Switch>
                        <Route path="/home" exact>
                            <HomePage />
                        </Route>
                        <Redirect to="/home" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/auth">
                            <AuthPage />
                        </Route>
                        <Route path="/register">
                            <Register onLogin={this.onLogin} />
                        </Route>
                        <Redirect to="/auth" />
                    </Switch>
                )}
            </Layout>
        );
    }
}

import React from 'react';
import './App.module.scss';
import HomePage from './containers/Home/HomePage';
import AuthPage from './containers/Auth/AuthPage';
import Register from './containers/Register/RegisterPage';
import Layout from './Layout/Layout';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Route path="/auth">
                    <AuthPage />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;

import React from 'react';
import './App.module.scss';
import HomePage from './containers/Home/HomePage';
import Layout from './Layout/Layout';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Redirect to="/home" />
            </Switch>
        </Layout>
    );
}

export default App;

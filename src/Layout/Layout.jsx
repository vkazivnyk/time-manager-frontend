import React from 'react';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import classes from './Layout.module.scss';
import { Link } from 'react-router-dom';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { children } = this.props;

        return (
            <div className={classes.container}>
                <header>
                    <BurgerMenu />
                    <h1>Time Manager</h1>
                </header>
                <main>{children}</main>
            </div>
        );
    }
}

export default Layout;

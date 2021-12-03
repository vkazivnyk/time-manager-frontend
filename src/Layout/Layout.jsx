import React from 'react';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import classes from './Layout.module.scss';

class Layout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={classes.container}>
                <header>
                    <BurgerMenu />

                    <h1>Time Manager</h1>
                </header>
                <main>Hi</main>
            </div>
        );
    }
}

export default Layout;

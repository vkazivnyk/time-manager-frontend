import React from 'react';
import classes from './BurgerMenu.module.scss';

class BurgerMenu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={classes.container}>
                <label for="burger" className={classes.burgerIcon}>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <input id="burger" />
            </div>
        );
    }
}

export default BurgerMenu;

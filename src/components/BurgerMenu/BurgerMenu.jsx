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
                <input type="checkbox" id="burger" />
                <label for="burger" className={classes.burgerIcon}>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <nav>
                    <ul>
                        <li>Link1</li>
                        <li>Link2</li>
                        <li>Link3</li>
                        <li>Link4</li>
                        <li>Link5</li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default BurgerMenu;

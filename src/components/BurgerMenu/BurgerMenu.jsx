import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './BurgerMenu.module.scss';

class BurgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: false };
    }
    render() {
        const { isChecked } = this.state;
        return (
            <div className={classes.container}>
                <input type="checkbox" id="burger" defaultChecked={isChecked} />
                <label
                    htmlFor="burger"
                    className={classes.burgerIcon}
                    onClick={() => {
                        console.log('Hi');
                        this.setState({ isChecked: !isChecked });
                    }}>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <nav>
                    <ul>
                        <li>
                            <a href="#">Link1</a>
                        </li>
                        <li>
                            <a href="#">Link1</a>
                        </li>
                        <li>
                            <a href="#">Link1</a>
                        </li>
                        <li>
                            <a href="#">Link1</a>
                        </li>
                        <li>
                            <a href="#">Link1</a>
                        </li>
                    </ul>
                </nav>
                <div className={classes.backDropWrapper}>
                    <Backdrop
                        onClick={() => {
                            this.setState({ isChecked: !isChecked });
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default BurgerMenu;

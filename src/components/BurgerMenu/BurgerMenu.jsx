import React from 'react';
import { Link } from 'react-router-dom';
import { authToken } from '../../global/js/authToken';
import Backdrop from '../Backdrop/Backdrop';
import classes from './BurgerMenu.module.scss';

class BurgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: false };
    }
    render() {
        const { isChecked } = this.state;

        const isAuthenticated = authToken.valid();

        const links = isAuthenticated ? (
            <li>
                <Link to="/home">Home</Link>
            </li>
        ) : (
            <>
                <li>
                    <Link to="/register">Sign up</Link>
                </li>
                <li>
                    <Link to="/auth">Sign in</Link>
                </li>
            </>
        );

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
                    <ul>{links}</ul>
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

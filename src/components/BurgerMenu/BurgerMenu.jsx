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
        const { logoutReguest } = this.props;

        const isAuthenticated = authToken.valid();

        const changeCheckbox = () => {
            this.setState({ isChecked: !isChecked });
        };

        const links = isAuthenticated ? (
            <li>
                <Link to="/home" onClick={changeCheckbox}>
                    Home
                </Link>
            </li>
        ) : (
            <>
                <li>
                    <Link to="/register" onClick={changeCheckbox}>
                        Sign up
                    </Link>
                </li>
                <li>
                    <Link to="/auth" onClick={changeCheckbox}>
                        Sign in
                    </Link>
                </li>
            </>
        );

        const logout = isAuthenticated ? (
            <li className={classes.logout}>
                <Link
                    onClick={() => {
                        logoutReguest();
                        changeCheckbox();
                    }}
                    to="/auth"
                    style={{
                        textDecoration: 'none',
                        color: '#dddddd',
                    }}>
                    Log out
                </Link>
            </li>
        ) : null;

        return (
            <div className={classes.container}>
                <input
                    type="checkbox"
                    id="burger"
                    checked={isChecked}
                    readOnly
                />
                <label
                    htmlFor="burger"
                    className={classes.burgerIcon}
                    onClick={changeCheckbox}>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <nav>
                    <ul>
                        {links} {logout}
                    </ul>
                </nav>
                <div className={classes.backDropWrapper}>
                    <Backdrop onClick={changeCheckbox} />
                </div>
            </div>
        );
    }
}

export default BurgerMenu;

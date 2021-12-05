import React from 'react';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import { authToken } from '../global/js/authToken';
import { Link } from 'react-router-dom';
import classes from './Layout.module.scss';
import { credentials } from '../global/js/credentials';
import Spinner from '../components/Spinner/Spinner';
import Backdrop from '../components/Backdrop/Backdrop';
import axiosRESTInstance from '../global/js/axiosRESTInstance';
import ErrorHandler from '../components/ErrorHandler/ErrorHandler';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            isLoading: false,
        };
    }

    logoutReguest = () => {
        const { onLogout } = this.props;
        this.setState({ isLoading: true });
        axiosRESTInstance
            .post('auth/logout')
            .then(() => {
                authToken.reset();
                credentials.reset();
                onLogout();
                this.setState({
                    isLoading: false,
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoading: false,
                    errors: err.response.data.errors,
                });
            });
    };

    render() {
        const { children, errors, isLoading } = this.props;

        const isAuthenticated = authToken.valid();

        const logout = isAuthenticated ? (
            <div className={classes.logout}>
                <Link
                    onClick={this.logoutReguest}
                    to="/auth"
                    style={{
                        textDecoration: 'none',
                        color: '#dddddd',
                    }}>
                    Log out
                </Link>
            </div>
        ) : null;

        return (
            <div className={classes.container}>
                <header>
                    <BurgerMenu logoutReguest={this.logoutReguest} />
                    <h1>Time Manager</h1>
                    {logout}
                </header>
                <main>{children}</main>
                {isLoading ? (
                    <Backdrop>
                        <Spinner />
                    </Backdrop>
                ) : null}
                <ErrorHandler
                    errors={errors}
                    onDismiss={() => this.setState({ errors: [] })}
                />
            </div>
        );
    }
}

export default Layout;

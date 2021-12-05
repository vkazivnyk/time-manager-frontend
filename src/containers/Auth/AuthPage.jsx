import React, { Component } from 'react';
import AuthBox from '../../components/AuthBox/AuthBox';
import Button from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import axiosRESTInstance from '../../global/js/axiosRESTInstance';
import { credentials } from '../../global/js/credentials';
import { authToken } from '../../global/js/authToken';
import Style from './AuthPage.module.scss';
import Backdrop from '../../components/Backdrop/Backdrop';
import Spinner from '../../components/Spinner/Spinner';
import ErrorHandler from '../components/ErrorHandler/ErrorHandler';

export default class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isLoading: false,
            errors: [],
        };
    }

    onClickHandler = () => {
        const { userName, password } = this.state;

        const { onLogin } = this.props;

        this.setState({
            isLoading: true,
        });

        axiosRESTInstance
            .post('/auth/login', {
                userName,
                password,
            })
            .then(res => {
                const { token, userName, email } = res.data;

                this.setState({
                    isLoading: false,
                });

                credentials.set(userName, email);
                authToken.set(token);

                onLogin();
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    errors: err.response.data.errors,
                });
            });
    };

    handleInputChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        const { userName, password, isLoading, errors } = this.state;

        const spinner = isLoading ? (
            <Backdrop>
                <Spinner />
            </Backdrop>
        ) : null;

        return (
            <AuthBox onClick={this.onClickHandler}>
                <Input
                    label="Enter a username"
                    value={userName}
                    type="text"
                    id="userName"
                    name="userName"
                    onChange={this.handleInputChange}
                />
                <Input
                    label="Enter a password"
                    value={password}
                    type="password"
                    id="password"
                    name="password"
                    onChange={this.handleInputChange}
                />
                <Button onClick={this.onClickHandler}>Submit</Button>
                <div className={Style.linkWrapper}>
                    <Link
                        to="/register"
                        style={{
                            textDecoration: 'none',
                            color: '#dddddd',
                        }}>
                        Register
                    </Link>
                </div>
                <ErrorHandler errors={this.errors} />
                {spinner}
            </AuthBox>
        );
    }
}

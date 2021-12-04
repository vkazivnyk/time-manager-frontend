import React, { Component } from 'react';
import AuthBox from '../../components/AuthBox/AuthBox';
import Button from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import Style from './RegisterPage.module.scss';
import Spinner from '../../components/Spinner/Spinner';
import Backdrop from '../../components/Backdrop/Backdrop';
import { Popup } from '../../components/Popup/Popup';
import axiosRESTInstance from '../../global/js/axiosRESTInstance';
import { credentials } from '../../global/js/credentials';
import { authToken } from '../../global/js/authToken';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            username: '',
            isLoading: false,
            errors: [],
        };
    }

    onClickHandler = () => {
        const { email, username, password, passwordConfirm, isLoading } =
            this.state;

        const { onLogin } = this.props;

        this.setState({
            isLoading: true,
        });

        axiosRESTInstance
            .post('/auth/register', {
                email,
                username,
                password,
                passwordConfirm,
            })
            .then(res => {
                const { token, username, email } = res.data;

                this.setState({
                    isLoading: false,
                });
                console.log(res.data);
                credentials.set(username, email);
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
        const {
            email,
            username,
            password,
            passwordConfirm,
            isLoading,
            errors,
        } = this.state;

        const spinner = isLoading ? (
            <Backdrop>
                <Spinner />
            </Backdrop>
        ) : null;

        return (
            <>
                {spinner}
                <AuthBox>
                    <Input
                        label="Enter an email"
                        value={email}
                        type="text"
                        id="email"
                        name="email"
                        onChange={this.handleInputChange}
                    />
                    <div className={Style.passwordContainer}>
                        <Input
                            label="Create a password"
                            value={password}
                            type="password"
                            id="password"
                            name="password"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            label="Confirm a password"
                            value={passwordConfirm}
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <Input
                        label="Create an username"
                        value={username}
                        type="text"
                        id="username"
                        name="username"
                        onChange={this.handleInputChange}
                    />
                    <Button onClick={this.onClickHandler}>Submit</Button>
                    <div className={Style.linkWrapper}>
                        <Link
                            to="/auth"
                            style={{
                                textDecoration: 'none',
                                color: '#dddddd',
                            }}>
                            Log in
                        </Link>
                    </div>
                    {errors.length ? (
                        <Popup
                            onDismiss={() => {
                                this.setState({ errors: [] });
                            }}>
                            {errors.map(element => (
                                <p>{element.message}</p>
                            ))}
                        </Popup>
                    ) : null}
                </AuthBox>
            </>
        );
    }
}

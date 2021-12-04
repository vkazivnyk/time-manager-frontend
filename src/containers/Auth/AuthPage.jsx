import React, { Component } from 'react';
import AuthBox from '../../components/AuthBox/AuthBox';
import Button from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import axiosRESTInstance from '../../global/js/axiosRESTInstance';
import { credentials } from '../../global/js/credentials';
import { authToken } from '../../global/js/authToken';
import Style from './AuthPage.module.scss';

export default class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            errors: [],
        };
    }

    onClickHandler = () => {
        const { email, password, isLoading } = this.state;

        this.setState({
            isLoading: true,
        });

        axiosRESTInstance
            .post('/auth/login', {
                email,
                password,
            })
            .then(res => {
                const { token, username, email } = res.data;

                this.setState({
                    isLoading: false,
                });

                credentials.set(username, email);
                authToken.set(token);
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
        const { email, password, isLoading } = this.state;

        return (
            <AuthBox onClick={this.onClickHandler}>
                <Input
                    label="Enter an email"
                    value={email}
                    type="email"
                    id="email"
                    name="email"
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
            </AuthBox>
        );
    }
}

import React, { Component } from 'react';
import AuthBox from '../../components/AuthBox/AuthBox';
import Button from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import Style from './RegisterPage.module.scss';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            username: '',
            isLoading: false,
        };
    }

    onClickHandler = () => {
        const { isLoading } = this.state;

        this.setState({
            isLoading: !isLoading,
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
                        value={password}
                        type="password"
                        id="password"
                        name="password"
                        onChange={this.handleInputChange}
                    />
                </div>
                <Input
                    label="Create an username"
                    value={password}
                    type="text"
                    id="password"
                    name="password"
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
            </AuthBox>
        );
    }
}

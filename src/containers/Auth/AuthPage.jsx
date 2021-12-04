import React, { Component } from 'react';
import AuthBox from '../../components/AuthBox/AuthBox';
import Button from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import Style from './AuthPage.module.scss';

export default class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
                    type="text"
                    id="email"
                    name="email"
                    onChange={this.handleInputChange}
                />
                <Input
                    label="Enter a password"
                    value={password}
                    type="text"
                    id="password"
                    name="password"
                    onChange={this.handleInputChange}
                />
                <Button onClick={this.onClickHandler}>Submit</Button>
            </AuthBox>
        );
    }
}

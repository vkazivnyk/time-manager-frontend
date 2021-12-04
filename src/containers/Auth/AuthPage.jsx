import React, { Component } from 'react';
import AuthBox from '../../components/AuthBox/AuthBox';
import Button from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Link } from 'react-router-dom';
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

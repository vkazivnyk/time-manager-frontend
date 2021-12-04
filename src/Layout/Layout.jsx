import React from 'react';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import Button from '../components/Button/Button';
import Task from '../components/Task/Task';
import classes from './Layout.module.scss';
import CalendarComponent from '../components/CalendarComponent/CalendarComponent';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { children } = this.props;

        return (
            <div className={classes.container}>
                <header>
                    <BurgerMenu />
                    <h1>Time Manager</h1>
                    <Button>Log in</Button>
                    <Button>Sign up</Button>
                </header>
                <main>{children}</main>
            </div>
        );
    }
}

export default Layout;

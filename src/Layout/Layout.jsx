import React from 'react';
import classes from './Layout.module.scss';

class Layout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={classes.container}>
                <header>
                    <h1>Time Manager</h1>
                </header>
                <main>Hi</main>
            </div>
        );
    }
}

export default Layout;

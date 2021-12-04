import React from 'react';
import classes from './Button.module.scss';

class Button extends React.Component {
    render() {
        const { onClick, children } = this.props;
        return (
            <button
                className={classes.myButton}
                onClick={onClick}
                type="button">
                {children}
            </button>
        );
    }
}

export default Button;

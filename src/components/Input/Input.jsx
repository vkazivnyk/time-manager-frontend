import React from 'react';

import classes from './Input.module.scss';

export const Input = ({ label, name, ...otherProps }) => {
    console.log(otherProps);
    return (
        <>
            <div className={classes.InputWrapper}>
                {label ? <label htmlFor={name}>{label}</label> : null}
                <input name={name} {...otherProps} />
            </div>
        </>
    );
};

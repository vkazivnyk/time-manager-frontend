import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Popup.module.scss';

export const Popup = ({ children, onDismiss }) => {
    console.log();

    return (
        <>
            <Backdrop onClick={onDismiss} />
            <div className={classes.Popup}>{children}</div>
        </>
    );
};

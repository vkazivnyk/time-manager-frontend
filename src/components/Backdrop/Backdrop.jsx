import React from 'react';
import Style from './Backdrop.module.scss';

const Backdrop = ({ onClick, children }) => (
    <div className={Style.Backdrop} onClick={onClick}>
        <div className={Style.BackdropInner}>{children}</div>
    </div>
);

export default Backdrop;

import React from 'react';
import Style from './AuthBox.module.scss';

const AuthBox = props => {
    const { children, onClick } = props;

    return <div className={Style.Wrapper}>{children}</div>;
};

export default AuthBox;

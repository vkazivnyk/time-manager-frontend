import React from 'react';
import Button from '../Button/Button';
import Style from './AuthBox.module.scss';

const AuthBox = props => {
    const { children, onClick } = props;

    return (
        <div className={Style.Wrapper}>
            {children}
            <Button onClick={onClick} />
        </div>
    );
};

export default AuthBox;

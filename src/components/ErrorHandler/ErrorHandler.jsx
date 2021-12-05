import React from 'react';
import { Popup } from '../Popup/Popup';
import Style from './ErrorHandler.module.scss';

const ErrorHandler = ({ errors }) => (
    <>
        {errors?.length ? (
            <Popup
                onDismiss={() => {
                    this.setState({ errors: [] });
                }}>
                {errors?.map(element => (
                    <p key={element.message}>{element.message}</p>
                ))}
            </Popup>
        ) : null}
    </>
);

export default ErrorHandler;

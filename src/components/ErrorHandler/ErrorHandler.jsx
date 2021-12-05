import React from 'react';
import { Popup } from '../Popup/Popup';

const ErrorHandler = ({ errors, onDismiss }) => (
    <>
        {errors?.length ? (
            <Popup onDismiss={onDismiss}>
                {errors?.map(element => (
                    <p key={element.message}>{element.message}</p>
                ))}
            </Popup>
        ) : null}
    </>
);

export default ErrorHandler;

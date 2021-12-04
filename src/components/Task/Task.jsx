import React from 'react';
import Style from './Task.module.scss';

let borderColor = '';

const selectBorderColor = difficulty => {
    if (difficulty === 0) {
        borderColor = '';
    }
};

const Todo = props => {
    const { children, onClickEdit, onClickDelete } = props;
    const difficulty = 0;
    selectBorderColor(difficulty);

    return (
        <div
            className={Style.Wrapper}
            style={{ borderColor: `${borderColor}` }}>
            <div className={Style.TaskWrapper}>{children}</div>
            <button type="button" onClick={onClickEdit}>
                &#9998;
            </button>
            <button type="button" onClick={onClickDelete}>
                &#10006;
            </button>
        </div>
    );
};

export default Todo;

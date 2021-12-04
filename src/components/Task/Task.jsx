import React from 'react';
import { FaPen, FaTimes } from 'react-icons/fa';

import Style from './Task.module.scss';

const Task = props => {
    const { onClickEdit, onClickDelete } = props;
    const difficulty = Math.floor(Math.random() * 3);
    const totalSeconds = 1000;
    const name = 'Some note';
    const deadline = '22.22.2222';

    let difficultyClass = Style.Easy;

    if (difficulty === 1) {
        difficultyClass = Style.Medium;
    }

    if (difficulty === 2) {
        difficultyClass = Style.Hard;
    }

    return (
        <div className={`${Style.TaskWrapper} ${difficultyClass}`}>
            <h2 className={Style.TaskName}>{name}</h2>
            <div className={Style.TaskItemsContainer}>
                <div className={Style.TaskInfoContainer}>
                    <div className={Style.TotalSecondsWrapper}>
                        Takes:
                        <span className={Style.TotalSeconds}>
                            {totalSeconds}
                        </span>
                        secs
                    </div>
                    <div className={Style.DeadlineWrapper}>
                        Deadline:
                        <span className={Style.Deadline}>{deadline}</span>
                    </div>
                </div>
                <div className={Style.ButtonsContainer}>
                    <button type="button" onClick={onClickEdit}>
                        <FaPen />
                    </button>
                    <button type="button" onClick={onClickDelete}>
                        <FaTimes />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;

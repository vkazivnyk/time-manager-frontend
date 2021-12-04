import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { FaPen, FaTimes } from 'react-icons/fa';

import Style from './Task.module.scss';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const Task = props => {
    const { task, onPutTask, onDeleteTask } = props;

    const { name, deadline, importance, difficulty } = task;

    const expiredClass = dayjs(task.deadline) < dayjs() ? Style.Expired : null;

    let difficultyClass = Style.Easier;


    if (difficulty === 1) {
        difficultyClass = Style.Easy;
    }

    if (difficulty === 2) {
        difficultyClass = Style.Medium;
    }

    if (difficulty === 3) {
        difficultyClass = Style.Hard;
    }

    if (difficulty === 4) {
        difficultyClass = Style.Harder;
    }

    let importanceValue = 'No importance';

    if (importance === 1) {
        importanceValue = 'Low importance';
    }

    if (importance === 2) {
        importanceValue = 'Middle importance';
    }

    if (importance === 3) {
        importanceValue = 'High importance';
    }

    if (importance === 4) {
        importanceValue = 'Extreme importance';
    }

    const deadlineFormat = dayjs(deadline).format('DD/MM/YY');

    return (
        <div
            className={`${Style.TaskWrapper} ${difficultyClass} ${expiredClass}`}>
            <h2 className={Style.TaskName}>{name}</h2>
            <div className={Style.TaskItemsContainer}>
                <div className={Style.TaskInfoContainer}>
                    <div className={Style.TotalSecondsWrapper}>
                        Importance:
                        <span className={Style.TotalSeconds}>
                            {importanceValue}
                        </span>
                    </div>
                    <div className={Style.DeadlineWrapper}>
                        Deadline:
                        <span className={Style.Deadline}>{deadlineFormat}</span>
                    </div>
                </div>
                <div className={Style.ButtonsContainer}>
                    <button type="button" onClick={onPutTask}>
                        <FaPen />
                    </button>
                    <button type="button" onClick={onDeleteTask}>
                        <FaTimes />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;

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

    const { name, deadline, timeEstimation, difficulty } = task;

    let difficultyClass = Style.Easy;

    if (difficulty === 2) {
        difficultyClass = Style.Medium;
    }

    if (difficulty === 3 || difficulty === 4) {
        difficultyClass = Style.Hard;
    }

    const takesFormat = dayjs.duration(timeEstimation, 'seconds').humanize();
    const deadlineFormat = dayjs(deadline).format('DD/MM/YY');

    return (
        <div className={`${Style.TaskWrapper} ${difficultyClass}`}>
            <h2 className={Style.TaskName}>{name}</h2>
            <div className={Style.TaskItemsContainer}>
                <div className={Style.TaskInfoContainer}>
                    <div className={Style.TotalSecondsWrapper}>
                        Takes:
                        <span className={Style.TotalSeconds}>
                            {takesFormat}
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

import React, { Component } from 'react';
import Task from '../../components/Task/Task';

import classes from './Tasks.module.scss';

export default class Tasks extends Component {
    render() {
        const { tasks, onDeleteTask, ...otherProps } = this.props;

        return (
            <div className={classes.TasksContainer} {...otherProps}>
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onDeleteTask={() => onDeleteTask(task)}
                    />
                ))}
            </div>
        );
    }
}

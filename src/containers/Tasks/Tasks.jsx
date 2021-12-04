import React, { Component } from 'react';
import Task from '../../components/Task/Task';

import classes from './Tasks.module.scss';

export default class Tasks extends Component {
    render() {
        const { tasks, ...otherProps } = this.props;

        return (
            <div className={classes.TasksContainer} {...otherProps}>
                {tasks.map(task => (
                    <Task key={task.id} />
                ))}
            </div>
        );
    }
}

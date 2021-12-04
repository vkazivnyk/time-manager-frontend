import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select';
import Button from '../../components/Button/Button';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import { Input } from '../../components/Input/Input';
import { Popup } from '../../components/Popup/Popup';
import axiosGQLInstance from '../../global/js/axiosGQLInstance';
import graphql from '../../global/js/graphql';
import Tasks from '../Tasks/Tasks';
import Style from './HomePage.module.scss';

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            errors: [],
            isTaskAdding: false,
            newTaskName: '',
        };

        this.difficultyOptions = [
            { value: 0, label: 'Easier' },
            { value: 1, label: 'Easy' },
            { value: 2, label: 'Normal' },
            { value: 3, label: 'Hard' },
            { value: 4, label: 'Harder' },
        ];
    }

    componentDidMount() {
        axiosGQLInstance
            .post('', {
                query: graphql.getTasks,
            })
            .then(res => {
                if (res.data.errors) {
                    this.setState({
                        errors: res.data.errors,
                    });
                    return;
                }

                this.setState({
                    tasks: res.data.data.task,
                });
            });
    }

    handleAddButtonClick = () => {
        this.setState({
            isTaskAdding: true,
        });
    };

    handleAddTaskInputChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        const { tasks, errors, isTaskAdding, newTaskName } = this.state;

        const popup = isTaskAdding ? (
            <Popup onDismiss={() => this.setState({ isTaskAdding: false })}>
                <Input
                    label="Enter a task name"
                    value={newTaskName}
                    type="text"
                    id="newTaskName"
                    name="newTaskName"
                    onChange={this.handleAddTaskInputChange}
                />
                <Select
                    options={this.difficultyOptions}
                    defaultValue={this.difficultyOptions[0]}
                />
                <div className={Style.PopupButtonWrapper}>
                    <Button>Submit</Button>
                </div>
            </Popup>
        ) : null;

        return (
            <>
                <div className={Style.AddTaskWrapper}>
                    <Button onClick={this.handleAddButtonClick}>
                        <FaPlus />
                    </Button>
                </div>
                <div className={Style.TasksCalendarWrapper}>
                    <Tasks tasks={tasks} className={Style.Tasks} />
                    <CalendarComponent className={Style.Calendar} />
                </div>
                {popup}
            </>
        );
    }
}

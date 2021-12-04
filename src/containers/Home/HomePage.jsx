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
import Spinner from '../../components/Spinner/Spinner';
import Style from './HomePage.module.scss';

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            errors: [],
            isTaskAdding: false,
            isTaskEditing: false,
            isLoading: false,
            newTaskName: '',
            newTaskTimeEstimation: '',
            newTaskDeadline: '2021-04-12 07:36:44 AM',
            newTaskDifficulty: 0,
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
                console.log(res.data);
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

    handleAddTaskSubmit = () => {
        const {
            newTaskName,
            newTaskDeadline,
            newTaskDifficulty,
            newTaskTimeEstimation,
        } = this.state;

        axiosGQLInstance
            .post('', {
                query: graphql.addTask({
                    name: newTaskName,
                    deadline: newTaskDeadline,
                    difficulty: newTaskDifficulty,
                    timeEstimation: newTaskTimeEstimation,
                }),
            })
            .then(res => {
                if (res.data.errors) {
                    this.setState({
                        errors: res.data.errors,
                    });
                    return;
                }
                const { tasks } = this.state;
                console.log(res.data.data.addUserTask.task);
                this.setState({
                    tasks: [...tasks, res.data.data.addUserTask.task],
                });
            });
    };

    onDeleteTask = element => {
        const { tasks } = this.state;
        const taskId = element['id'];

        this.setState({
            isLoading: true,
        });

        axiosGQLInstance
            .post('', {
                query: graphql.deleteTask(taskId),
            })
            .then(res => {
                if (res.data.errors) {
                    this.setState({
                        errors: res.data.errors,
                        isLoading: false,
                    });
                    return;
                }

                const deletedTaskIndex = tasks.findIndex(t => t.id === taskId);

                tasks.splice(deletedTaskIndex, 1);
                this.setState({
                    tasks: [...tasks],
                    isLoading: false,
                });
            });
    };

    render() {
        const {
            tasks,
            errors,
            isTaskAdding,
            isLoading,
            newTaskName,
            newTaskTimeEstimation,
            newTaskDeadline,
        } = this.state;

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
                <Input
                    label="Enter a time expectation"
                    value={newTaskTimeEstimation}
                    type="text"
                    id="newTaskTimeEstimation"
                    name="newTaskTimeEstimation"
                    onChange={this.handleAddTaskInputChange}
                />
                <Input
                    label="Enter a deadline"
                    value={newTaskDeadline}
                    type="text"
                    id="newTaskDeadline"
                    name="newTaskDeadline"
                    onChange={this.handleAddTaskInputChange}
                />
                <Select
                    options={this.difficultyOptions}
                    defaultValue={this.difficultyOptions[0]}
                    onChange={e =>
                        this.setState({ newTaskDifficulty: e.value })
                    }
                />
                <div className={Style.PopupButtonWrapper}>
                    <Button onClick={this.handleAddTaskSubmit}>Submit</Button>
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
                    <Tasks
                        tasks={tasks}
                        className={Style.Tasks}
                        onDeleteTask={this.onDeleteTask}
                    />
                    <CalendarComponent className={Style.Calendar} />
                </div>
                {popup}
                {isLoading ? <Spinner /> : null}
            </>
        );
    }
}

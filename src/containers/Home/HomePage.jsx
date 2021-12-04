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
import Backdrop from '../../components/Backdrop/Backdrop';
import dayjs from 'dayjs';

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allTasks: [],
            tasks: [],
            errors: [],
            isTaskAdding: false,
            isTaskEditing: false,
            isLoading: false,
            minDate: dayjs().toDate(),
            currentDate: dayjs().toDate(),
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
        this.fetchTasks();
    }

    componentDidUpdate(_, prevState) {
        const { currentDate, allTasks, minDate } = this.state;

        if (currentDate < minDate) {
            this.setState(
                {
                    minDate: currentDate,
                },
                () => this.fetchTasks(),
            );
        }

        if (
            currentDate != prevState.currentDate ||
            allTasks != prevState.allTasks
        ) {
            this.setState({
                tasks: allTasks.filter(
                    t => dayjs(t.deadline) > dayjs(currentDate),
                ),
            });
        }
    }

    fetchTasks() {
        const { currentDate } = this.state;

        axiosGQLInstance
            .post('', {
                query: graphql.getTasks({ endDate: currentDate }),
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
                    allTasks: res.data.data.task,
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

    handleCalendarDateChange = e => {
        this.setState({
            currentDate: e,
        });
    };

    handleAddTaskSubmit = () => {
        const {
            newTaskName,
            newTaskDeadline,
            newTaskDifficulty,
            newTaskTimeEstimation,
        } = this.state;

        this.setState({
            isLoading: true,
            isTaskAdding: false,
        });

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
                        isLoading: false,
                    });
                    return;
                }
                const { allTasks } = this.state;
                console.log(res.data.data.addUserTask.task);
                this.setState({
                    allTasks: [...allTasks, res.data.data.addUserTask.task],
                    isLoading: false,
                });
            });
    };

    onDeleteTask = element => {
        const { allTasks } = this.state;
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

                const deletedTaskIndex = allTasks.findIndex(
                    t => t.id === taskId,
                );

                allTasks.splice(deletedTaskIndex, 1);
                this.setState({
                    allTasks: [...allTasks],
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
            currentDate,
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
                    <CalendarComponent
                        className={Style.Calendar}
                        onChange={this.handleCalendarDateChange}
                        value={currentDate}
                    />
                </div>
                {popup}
                {isLoading ? (
                    <Backdrop>
                        <Spinner />
                    </Backdrop>
                ) : null}
            </>
        );
    }
}

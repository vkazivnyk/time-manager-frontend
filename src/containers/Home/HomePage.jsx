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
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';

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
            newTaskDeadline: '2021-04-12 07:36:44 AM',
            newTaskImportance: 0,
            newTaskDifficulty: 0,
            editedTask: '',
        };

        this.difficultyOptions = [
            { value: 0, label: 'Easier' },
            { value: 1, label: 'Easy' },
            { value: 2, label: 'Normal' },
            { value: 3, label: 'Hard' },
            { value: 4, label: 'Harder' },
        ];

        this.importanceOptions = [
            { value: 0, label: 'No importance' },
            { value: 1, label: 'Low importance' },
            { value: 2, label: 'Middle importance' },
            { value: 3, label: 'High importance' },
            { value: 4, label: 'Extreme importance' },
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
            currentDate !== prevState.currentDate ||
            allTasks !== prevState.allTasks
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

        this.setState({
            isLoading: true,
        });

        axiosGQLInstance
            .post('', {
                query: graphql.getTasks({ endDate: currentDate }),
            })
            .then(res => {
                if (res.data.errors) {
                    this.setState({
                        errors: res.data.errors,
                        isLoading: false,
                    });
                    return;
                }
                console.log(res.data);
                this.setState({
                    allTasks: res.data.data.task,
                    tasks: res.data.data.task,
                    isLoading: false,
                });
            });
    }

    handleAddButtonClick = () => {
        this.setState({
            isTaskAdding: true,
        });
    };

    handleTaskInputChange = e => {
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
            newTaskImportance,
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
                    importance: newTaskImportance,
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
            })
            .catch(error => console.dir({ error }));
    };

    onPutTask = element => {
        this.setState({
            isTaskEditing: true,
            editedTask: element,
        });
    };

    handlePutTaskSubmit = () => {
        const {
            newTaskName,
            newTaskDeadline,
            newTaskDifficulty,
            newTaskImportance,
            editedTask,
            tasks,
        } = this.state;

        this.setState({
            isTaskEditing: false,
            isLoading: true,
        });

        const newTask = {
            id: editedTask['id'],
            name: newTaskName,
            deadline: newTaskDeadline,
            difficulty: newTaskDifficulty,
            importance: newTaskImportance,
        };

        axiosGQLInstance
            .post('', {
                query: graphql.putTask(newTask),
            })
            .then(res => {
                if (res.data.errors) {
                    this.setState({
                        errors: res.data.errors,
                        isLoading: false,
                    });
                    return;
                }

                const editedTaskIndex = tasks.findIndex(
                    t => t.id === newTask.id,
                );

                tasks[editedTaskIndex] = newTask;
                this.setState({
                    tasks: [...tasks],
                    isLoading: false,
                });
            });
    };

    handleErrors = error => {
        console.log(error);
    };

    render() {
        const {
            tasks,
            errors,
            isTaskAdding,
            isTaskEditing,
            isLoading,
            currentDate,
            newTaskName,
            newTaskImportance,
            newTaskDeadline,
            editedTask,
        } = this.state;

        const addPopup = isTaskAdding ? (
            <Popup onDismiss={() => this.setState({ isTaskAdding: false })}>
                <Input
                    label="Enter a task name"
                    value={newTaskName}
                    type="text"
                    id="newTaskName"
                    name="newTaskName"
                    onChange={this.handleTaskInputChange}
                />
                <div className={Style.deadlineWrapper}> Enter deadline</div>
                <DateTimePicker />
                <div className={Style.select}>
                    <Select
                        options={this.importanceOptions}
                        defaultValue={this.importanceOptions[0]}
                        onChange={e =>
                            this.setState({ newTaskImportance: e.value })
                        }
                    />
                </div>
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

        const putPopup = isTaskEditing ? (
            <Popup onDismiss={() => this.setState({ isTaskEditing: false })}>
                <Input
                    label="Enter a task name"
                    value={newTaskName}
                    placeholder="New task message"
                    type="text"
                    id="newTaskName"
                    name="newTaskName"
                    onChange={this.handleTaskInputChange}
                />
                <div className={Style.deadlineWrapper}> Enter deadline</div>
                <DateTimePicker />
                <div className={Style.select}>
                    <Select
                        options={this.importanceOptions}
                        defaultValue={this.importanceOptions[0]}
                        onChange={e =>
                            this.setState({ newTaskImportance: e.value })
                        }
                    />
                </div>
                <Select
                    options={this.difficultyOptions}
                    defaultValue={this.difficultyOptions[0]}
                    onChange={e =>
                        this.setState({ newTaskDifficulty: e.value })
                    }
                />
                <div className={Style.PopupButtonWrapper}>
                    <Button onClick={this.handlePutTaskSubmit}>Submit</Button>
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
                        onPutTask={this.onPutTask}
                    />
                    <CalendarComponent
                        className={Style.Calendar}
                        onChange={this.handleCalendarDateChange}
                        value={currentDate}
                    />
                </div>
                {addPopup}
                {putPopup}
                {isLoading ? (
                    <Backdrop>
                        <Spinner />
                    </Backdrop>
                ) : null}
                {errors.length ? (
                    <Popup
                        onDismiss={() => {
                            this.setState({ errors: [] });
                        }}>
                        {errors.map(element => (
                            <p>{element.message}</p>
                        ))}
                    </Popup>
                ) : null}
            </>
        );
    }
}

import React, { Component } from 'react';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import Layout from '../../Layout/Layout';
import Tasks from '../Tasks/Tasks';
import Style from './HomePage.module.scss';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [{}, {}, {}, {}, {}],
            /*Task : {
                Id: '',
                UserId: '',
                Name: '',
                DeadLine: '',
                TotalSeconds: '',
                Difficulty: '',
                Priority: '',
            },*/
            errors: [],
        };
    }

    render() {
        const { tasks, errors } = this.state;

        return (
            <Layout>
                <div className={Style.TasksCalendarWrapper}>
                    <Tasks tasks={tasks} className={Style.Tasks} />
                    <CalendarComponent className={Style.Calendar} />
                </div>
            </Layout>
        );
    }
}

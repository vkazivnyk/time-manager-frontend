import React, { Component } from 'react';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import axiosGQLInstance from '../../global/js/axiosGQLInstance';
import graphql from '../../global/js/graphql';
import Layout from '../../Layout/Layout';
import Tasks from '../Tasks/Tasks';
import Style from './HomePage.module.scss';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            errors: [],
        };
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
